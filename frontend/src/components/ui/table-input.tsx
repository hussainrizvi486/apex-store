import React, { useState, useEffect } from "react";
import { CircleX, Files, FileText, Trash2 } from "lucide-react";

import { cn, float } from "@utils/index";
import { FieldState } from "@components/data-form/index";

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
import { TypeOption } from "@components/data-form/types";

type FieldType = "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "checkbox" | "table";
type InputValue = string | number | boolean | undefined | null;
type TableInputValue = Array<Record<string, InputValue>>;

interface TypeField<T extends FieldType = FieldType> {
  label: string;
  name: string;
  type: T;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  options?: TypeOption[];
  defaultValue?: InputValue;
  onChange?: (value: InputValue) => void;
  getOptions?: () => Promise<TypeOption[]>;
  fields?: Array<TypeField>; // For nested table fields
}

interface TableInputContextType {
  fields: Array<TypeField>;
  values: Record<string, InputValue> | null;
  state: Record<string, FieldState>;
  data: TableInputValue;
  setValue: (name: string, value: InputValue) => void;
  getValue: (name: string) => InputValue;
  getValues: () => Record<string, InputValue>;
  handleFieldChange: (rowIndex: number, fieldName: string, value: InputValue) => void;
  handleDelete: (index: number) => void;
}

interface TableInputProps {
  fields: Array<TypeField>;
  actionLabel?: string,
  onChange?: (data: TableInputValue) => void;
  value?: TableInputValue;
  defaultValue?: TableInputValue;
  label?: string;
  className?: string;
}

interface FieldProps extends TypeField {
  state?: FieldState | null;
  onChange?: (value: InputValue) => void;
  onBlur?: (value: InputValue) => void;
  value?: InputValue;
}

function getColumnsCSS(count: number): React.CSSProperties {
  let styles = "2rem ";
  styles += `repeat(${count}, 1fr) `;
  styles += "2rem"
  return { gridTemplateColumns: styles };
}

const TableInputContext = React.createContext<TableInputContextType | null>(null);

const TableInputProvider: React.FC<{
  children: React.ReactNode;
  fields: Array<TypeField>;
  data: TableInputValue;
  onChange?: (data: TableInputValue) => void;
}> = ({ children, fields, data, onChange }) => {
  const getInitialState = () => {
    return fields.reduce((state, field) => {
      state[field.name] = {
        value: field.defaultValue || null,
        name: field.name,
        error: "",
        hasError: false,
      };
      return state;
    }, {} as Record<string, FieldState>);
  };

  const [state, setState] = useState(getInitialState());

  const setValue = (name: string, value: InputValue) => {
    setState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        hasError: false,
        error: ""
      }
    }));
  };

  const getValue = (name: string): InputValue => {
    return state[name]?.value || null;
  };

  const getValues = (): Record<string, InputValue> => {
    return fields.reduce((values, field) => {
      values[field.name] = state[field.name]?.value || null;
      return values;
    }, {} as Record<string, InputValue>);
  };

  const handleFieldChange = (rowIndex: number, fieldName: string, fieldValue: InputValue) => {
    const newData = [...data];
    const field = fields.find(f => f.name === fieldName);

    // Handle autocomplete special case
    let processedValue = fieldValue;
    if (field?.type === "autocomplete" && typeof fieldValue === 'object' && fieldValue !== null) {
      processedValue = (fieldValue as any)?.value || null;
    }

    newData[rowIndex] = {
      ...newData[rowIndex],
      [fieldName]: processedValue
    };

    onChange?.(newData);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange?.(newData);
  };

  const values = getValues();

  return (
    <TableInputContext.Provider value={{
      fields,
      state,
      values,
      data,
      setValue,
      getValue,
      getValues,
      handleFieldChange,
      handleDelete
    }}>
      {children}
    </TableInputContext.Provider>
  );
};

const useTableInputContext = () => {
  const context = React.useContext(TableInputContext);
  if (!context) {
    throw new Error("useTableInputContext must be used within a TableInputProvider");
  }
  return context;
};

const Field: React.FC<FieldProps> = (props) => {
  const [fieldClassName, setFieldClassName] = useState<string>("");
  const { state, type, onChange, onBlur, value } = props;

  const handleChange = (newValue: InputValue) => {
    onChange?.(newValue);
  };

  const handleBlur = (newValue: InputValue) => {
    onBlur?.(newValue);
  };

  useEffect(() => {
    if (state?.hasError) {
      setFieldClassName("ring-2 ring-red-500 ring-offset-2");
    } else {
      setFieldClassName("");
    }
  }, [state?.hasError]);

  if (!type) {
    return null;
  }
  const className = cn("my-0 h-full shadow-none border-0", fieldClassName);


  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          name={props.name}
          id={props.name}
          checked={Boolean(value)}
          onCheckedChange={handleChange}
          className={className}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={handleChange}
          value={String(value || "")}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={props.placeholder || "Select"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {props.options?.map((option, index) => (
                <SelectItem className="text-sm" key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );

    case "autocomplete":
      return (
        <AutoComplete
          label={props.label}
          options={props.options}
          getOptions={props.getOptions}
          onChange={handleChange}
          className={className}
          value={value}
        />
      );

    case "date":
      return (
        <Input
          name={props.name}
          className={className}
          placeholder={props.placeholder || "YYYY-MM-DD"}
          disabled={props.disabled}
          value={String(value)}
          type="date"
          onChange={(newValue) => handleChange(newValue)}
          onBlur={(newValue) => handleBlur(newValue)}
        />
      );

    case "number":
    case "float":
      return (
        <Input
          name={props.name}
          type="number"
          placeholder={type === "number" ? "0" : "0.00"}
          disabled={props.disabled}
          className={cn(className, "text-right")}
          value={String(value || "")}
          onChange={(v) => handleChange(float(v))}
          onBlur={(v) => handleBlur(float(v))}
        />
      );


    default:
      return (
        <Input
          name={props.name}
          placeholder={props.placeholder || "Enter value"}
          disabled={props.disabled}
          type="text"
          className={className}
          value={String(value)}
          onChange={(v) => handleChange(v)}
          onBlur={(v) => handleBlur(v)}
        />
      );
  }
};

const TableInputHeader: React.FC<{ fields: Array<TypeField> }> = ({ fields }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div
        className="grid items-center h-10 "
        style={getColumnsCSS(fields.length)}
      >
        <div className="px-3 flex items-center justify-center border-r border-gray-200">
          <span className="text-sm font-medium text-gray-600">#</span>
        </div>

        {fields.map((field) => (
          <div key={field.name} className="px-3 py-2 border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            {field.description && (
              <div className="text-xs text-gray-500 mt-1">{field.description}</div>
            )}
          </div>
        ))}

        <div className="px-3 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600"><CircleX className="size-4" /></span>
        </div>
      </div>
    </div>
  );
};

const EmptyTable: React.FC = () => (
  <div className="py-8 flex justify-center">
    <div className="flex flex-col items-center text-gray-500">
      <FileText className="w-12 h-12 mb-2" />
      <div className="text-sm">No data available</div>
      {/* <div className="text-xs text-gray-400">Click "Add Row" to get started</div> */}
    </div>
  </div>
);

const TableInputBody: React.FC = () => {
  const { fields, data, handleFieldChange, handleDelete } = useTableInputContext();

  if (!data || data.length === 0) {
    return <EmptyTable />;
  }

  return (
    <div className="divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid items-center h-10 hover:bg-gray-50"
          style={getColumnsCSS(fields.length)}
        >
          <div className="px-3 flex items-center justify-center border-r border-gray-200 h-full">
            <span className="text-sm text-gray-600">{rowIndex + 1}</span>
          </div>

          {fields.map((field) => (
            <div key={field.name} className="px-2 py-1 border-r border-gray-200 last:border-r-0 h-full">
              <Field
                {...field}
                onChange={(fieldValue) => handleFieldChange(rowIndex, field.name, fieldValue)}
                value={row[field.name]}
              />
            </div>
          ))}

          <div className="px-3 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleDelete(rowIndex)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors cursor-pointer"
              title="Delete row"
            >
              <Trash2 className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TableInput: React.FC<TableInputProps> = ({
  fields,
  actionLabel,
  onChange,
  value,
  defaultValue,
  label,
  className,
}) => {
  const [data, setData] = React.useState<TableInputValue>(defaultValue || []);

  useEffect(() => {
    if (value !== undefined) {
      setData(value);
    } else if (defaultValue) {
      setData(defaultValue);
    }
  }, [value, defaultValue]);

  const handleDataChange = (newData: TableInputValue) => {
    setData(newData);
    onChange?.(newData);
  };

  const handleAdd = () => {
    const newRow = fields.reduce((row, field) => {
      row[field.name] = field.defaultValue || null;
      return row;
    }, {} as Record<string, InputValue>);

    const newData = [...data, newRow];
    handleDataChange(newData);
  };

  return (
    <TableInputProvider fields={fields} data={data} onChange={handleDataChange}>
      <div className={cn("space-y-4", className)}>
        {label && (
          <div className="text-sm font-medium text-gray-700">{label}</div>
        )}

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <TableInputHeader fields={fields} />
          <TableInputBody />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {/* {data.length} {data.length === 1 ? 'row' : 'rows'} */}
          </div>
          <Button size="sm" onClick={handleAdd}>
            {actionLabel || "Add Row"}
          </Button>
        </div>
      </div>
    </TableInputProvider>
  );
};

export { TableInput };