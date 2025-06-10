import { useState, useEffect } from "react";
import { FileText, Trash2 } from "lucide-react";

import { cn } from "@utils/index";
import { FieldValue, TypeField } from "@components/data-form/index";
import { AutoComplete } from "@components/ui/autocomplete";
import { Button } from "./button";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";


type InputValue = string | number | boolean | undefined | null;
export type TableInputValue = Array<Record<string, InputValue>>;

function getColumnsStyles(columnCount: number) {
  let styles = "2rem ";
  styles += `repeat(${columnCount}, 1fr) `;
  styles += `2rem`
  return styles;
}

interface TableInputProps {
  onChange?: (data: TableInputValue) => void;
  label?: string;
  value?: TableInputValue;
  defaultValue?: TableInputValue;
  fields: Array<TypeField>;
}



export const Field: React.FC<FieldProps> = (props) => {
  const { state, type } = props;

  const [className, setClassName] = useState<string>();

  function handleChange(value: FieldValue) {
    props?.onChange?.(value);
  }

  function handleBlur(value: FieldValue) {
    props?.onBlur?.(value);
  }


  useEffect(() => {
    if (state?.hasError) {
      setClassName("ring ring-offset-3 ring-destructive");
    }
    else {
      setClassName("");
    }
  }, [state, state?.hasError])

  if (!type) {
    return <></>
  }

  if (type === "checkbox") {
    return (
      <Checkbox name={props.name} id={props.name}
        onCheckedChange={handleChange}
        className={cn(props.className, className)}
      />
    )
  }
  if (type == "select") {
    return (
      <main>
        <Select onValueChange={handleChange} >
          <SelectTrigger className={cn(props.className, className)}
          >
            <SelectValue placeholder={props.placeholder || "Select"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {props.options?.map((option, index) => (
                <SelectItem className="text-sm" key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select >
      </main>

    )
  }

  if (type == "autocomplete") {
    return (
      <AutoComplete options={props.options} getOptions={props.getOptions} onChange={handleChange} className={cn(props.className, className)}
      />

    )
  }

  if (type == "table") {
    return (
      <TableInput fields={props.fields} />
    )
  }

  if (type === "date") {
    return (
      <Input
        className={cn(props.className, className)}
        name={props.name}
        type="date"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  }


  if (["currency", "float", "number"].includes(type)) {
    return (
      <input className={cn(
        "w-full px-2 py-1 h-8 my-2 text-right rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className, props.className,
      )}
        type="number"
        placeholder={type == "number" ? "0" : "0.00"}
        name={props.name}

        onChange={(event) => handleChange(event.target.value)}
        onBlur={(event) => handleBlur(event.target.value)}
      />
    )
  }
  return (
    <Input
      className={cn(props.className, className)}
      name={props.name}
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

const EmptyTable = () => {
  return (
    <div className="py-4 flex justify-center">
      <div className="flex flex-col items-center">
        <FileText className="stroke-gray-400" />
        <div className="text-sm text-center">No Data</div>
      </div>
    </div>
  );
};

export const TableInput: React.FC<TableInputProps> = ({
  fields,
  onChange,
  value,
  defaultValue,
}) => {
  let fieldObject = fields.reduce((acc, field) => {
    acc[field.name] = field;
    return acc;
  }, {} as Record<string, TypeField>);

  const [data, setData] = useState<TableInputValue>(defaultValue || []);

  useEffect(() => {
    if (value) {
      setData(value);
    } else if (defaultValue) {
      setData(defaultValue);
    }
  }, [value, defaultValue]);

  const handleAdd = () => {
    const newData = [...data, {}];
    setData(newData);
    onChange?.(newData);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    onChange?.(newData);
  };

  const handleFieldChange = (index: number, name: string, value: InputValue) => {
    const newData = [...data];

    if (fieldObject[name]?.type == "autocomplete") {
      value = value?.value || null;
    }

    newData[index] = { ...newData[index], [name]: value };
    setData(newData);
    onChange?.(newData);
  };


  // console.log(defaultValue)
  return (
    <div>
      <div className="border border-gray-200 rounded-md p-1">
        <div className="bg-[#f2f2f2] rounded-sm">
          <div className="grid items-center" style={{ gridTemplateColumns: getColumnsStyles(fields.length) }}>
            <div className="px-2 flex items-center justify-center border-r border-r-gray-200 ">
              <div className="text-sm font-medium">No.</div>
            </div>

            {fields.map((field) => (
              <div key={field.name} className="">
                <div className="text-sm font-medium px-2 py-2 border-r border-r-gray-200 last:border-none">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </div>
              </div>
            ))}

            <div className=""></div>
          </div>
        </div>

        {!data || data.length === 0 ? (
          <EmptyTable />
        ) : (
          data.map((row, i) => (
            <div className="grid border-b border-gray-200 last:border-none h-10 relative" style={{ gridTemplateColumns: getColumnsStyles(fields.length) }} key={i}>
              <div className="px-2 flex items-center justify-center border-r border-r-gray-200 ">
                <div className="text-sm">{i + 1}</div>
              </div>

              {fields.map((field) => (
                <div key={field.name} className="border-r border-r-gray-200 last:border-none h-full relative p-1">

                  <div className="h-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1 rounded">
                    <Field
                      {...field}
                      className="h-full w-full border-none outline-none focus:ring-0 rounded px-2 my-0"
                      onChange={(value) => handleFieldChange(i, field.name, value)}
                      value={row[field.name]}
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => handleDelete(i)}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          onClick={handleAdd}
        >
          Add Row
        </Button>

      </div>
    </div>
  );
};