import { useState, useEffect } from "react";
import { FileText, Trash2 } from "lucide-react";
import { TypeField } from "@components/data-form/index";
import { BaseField } from "@components/data-form/components/field";
import { Button } from "./button";

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
  const [data, setData] = useState<TableInputValue>([]);

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
    newData[index] = { ...newData[index], [name]: value };
    setData(newData);
    onChange?.(newData);
  };

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
                    <BaseField
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