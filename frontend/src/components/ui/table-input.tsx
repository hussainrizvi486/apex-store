import { useState, useEffect } from "react";
import { FileText, Trash2 } from "lucide-react";
import { Input } from "./input";
import { AutoComplete } from "./autocomplete";
import { FieldType } from "@components/data-form/field";

type InputValue = string | number | boolean | undefined | null;
export type TableInputValue = Array<Record<string, InputValue>>;

interface TableInputProps {
  onChange?: (data: TableInputValue) => void;
  label?: string;
  value?: TableInputValue;
  defaultValue?: TableInputValue;
  fields: Array<FieldType>;
}

const TableFormField: React.FC<{
  field: FieldType;
  value?: InputValue;
  onChange?: (name: string, value: InputValue) => void;
}> = ({ field, value, onChange }) => {
  const props = {
    name: field.name,
    value: value,
    onChange: (e: any) => onChange?.(field.name, e.target?.value !== undefined ? e.target.value : e),
    placeholder: field.placeholder,
    required: field.required,
    className: "border-none py-1.5 px-2 rounded-none shadow-none mt-0 ring-0 w-full",
  };

  switch (field.type) {
    case "text":
    case "number":
    case "float":
      return <Input type={field.type === "float" ? "number" : field.type} {...props} />;
    case "autocomplete":
      return (
        <AutoComplete
          options={field.options}
          value={value as any}
          onChange={(val) => onChange?.(field.name, val)}
          className="py-1.5 px-2"
        />
      );
    default:
      return <Input type="text" {...props} />;
  }
};

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

  // Initialize with value or defaultValue
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
      <div className="border border-input rounded-md overflow-hidden">
        <div className="bg-gray-50">
          <div className="flex">
            <div className="basis-1/12 shrink-0 px-2 flex items-center justify-center">
              <div className="text-sm">No.</div>
            </div>

            {fields.map((field) => (
              <div key={field.name} className="basis-full">
                <div className="text-sm px-2 py-2 border-input border-x">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </div>
              </div>
            ))}
            <div className="basis-1/12"></div>
          </div>
        </div>

        {!data || data.length === 0 ? (
          <EmptyTable />
        ) : (
          data.map((row, i) => (
            <div className="border-b border-input last:border-none" key={i}>
              <div className="flex items-center h-12">
                <div className="basis-1/12 shrink-0 px-2 flex items-center justify-center">
                  <div className="text-sm">{i + 1}</div>
                </div>

                {fields.map((field) => (
                  <div className="basis-full" key={field.name}>
                    <div className="border-x border-input">
                      <div className="focus-within:ring-1 ring-offset-1 ring-ring">
                        <TableFormField
                          field={field}
                          value={row[field.name]}
                          onChange={(name, value) => handleFieldChange(i, name, value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="basis-1/12">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAdd}
          className="text-xs px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded"
          type="button"
          role="button"
        >
          Add Row
        </button>
      </div>
    </div>
  );
};
