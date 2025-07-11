import React, { useState, useEffect } from "react";
import { CircleX, FileText, Trash2, Settings as SettingsIcon, Pencil as PencilIcon } from "lucide-react";

import { FieldState, TypeField } from "@components/data-form/types";

import { Button } from "@components/ui/button";
import { AutoComplete } from "@components/ui/autocomplete";
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
import { FieldValue } from "@components/data-form";
import { cn } from "@utils/index";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@components/ui/dialog";



type InputValue = string | number | boolean | undefined | null;
type TableInputValue = Array<Record<string, InputValue>>;


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


function getColumnsCSS(count: number): React.CSSProperties {
  let styles = "2rem ";
  styles += `repeat(${count}, 1fr) `;
  styles += "2rem 2rem";
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


interface FieldProps {
  field: TypeField;
  onChange?: (value: InputValue) => void;
  onBlur?: (value: InputValue) => void;
  value?: FieldValue;
}

const Field: React.FC<FieldProps> = React.memo((props) => {
  const { field, onChange, onBlur, value } = props;
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    if (field.required && (value === null || value === undefined || value === "")) {
      setClassName("ring-2 ring-red-500 ring-offset-2");
    } else {
      setClassName("");
    }
  }, [field.required, value]);



  if (field.type === "checkbox") {
    return (
      <Checkbox
        name={field.name}
        id={field.name}
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange?.(checked)}
        onBlur={() => onBlur?.(value)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea 
        name={field.name} 
        className={cn("w-full text-sm p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)} 
        rows={6}
        onChange={(event) => onChange?.(event.target.value)}
        onBlur={(event) => onBlur?.(event.target.value)}
        value={value as string || ""}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        value={value as string || ""}
        onValueChange={(val) => onChange?.(val)}
      >
        <SelectTrigger className={cn(className)}
          onBlur={() => onBlur?.(value)}
        >
          <SelectValue placeholder={field.placeholder || "Select"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {field.options?.map((option) => (
              <SelectItem className="text-sm" key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "autocomplete") {
    return (
      <AutoComplete 
        label={field.label} 
        className={className}
        onChange={onChange}
        value={value}
        getOptions={field.getOptions} 
        renderOption={field.renderOption} 
      />
    );
  }

  if (field.type === "custom" && field.component) {
    return field.component({ 
      value,
      onChange,
      onBlur,
      field
    });
  }

  return (
    <Input
      name={field.name}
      className={className}
      type={field.type === "number" || field.type === "float" || field.type === "currency" ? "number" : "text"}
      onChange={(event) => onChange?.(event.target.value)}
      onBlur={(event) => onBlur?.(event.target.value)}
      value={value as string || ""}
      placeholder={field.placeholder}
    />
  );
});

const TableInputHeader: React.FC<{ fields: Array<TypeField> }> = ({ fields }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div
        className="grid items-center h-10"
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

        <div className="px-3 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600"><SettingsIcon className="size-4" /></span>
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
      <div className="text-xs text-gray-400">Click "Add Row" to get started</div>
    </div>
  </div>
);

const TableInputForm: React.FC<{ 
  row: Record<string, InputValue>; 
  index: number;
  onClose: () => void;
  onSave: (data: Record<string, InputValue>) => void;
}> = ({ row, index, onClose, onSave }) => {
  const { fields } = useTableInputContext();
  const [formValues, setFormValues] = useState<Record<string, InputValue>>({...row});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: InputValue) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required && (formValues[field.name] === undefined || formValues[field.name] === null || formValues[field.name] === "")) {
        newErrors[field.name] = "This field is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formValues);
      onClose();
    }
  };

  return (
    <div className="space-y-4 py-2">
      <DialogHeader>
        <DialogTitle>Editing Row #{index + 1}</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-1">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Field
              field={field}
              onChange={(value) => handleChange(field.name, value)}
              value={formValues[field.name]}
            />
            {errors[field.name] && (
              <div className="text-xs text-red-500">{errors[field.name]}</div>
            )}
          </div>
        ))}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </div>
  );
};

const TableInputBody: React.FC = () => {
  const { fields, data, handleFieldChange, handleDelete } = useTableInputContext();
  const [editingRow, setEditingRow] = useState<{ index: number; data: Record<string, InputValue> } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <EmptyTable />;
  }

  const handleEditRow = (index: number) => {
    setEditingRow({ index, data: { ...data[index] } });
  };

  const handleSaveRow = (updatedData: Record<string, InputValue>) => {
    if (editingRow === null) return;

    // Update each field individually to trigger the handleFieldChange for each field
    Object.keys(updatedData).forEach(fieldName => {
      handleFieldChange(editingRow.index, fieldName, updatedData[fieldName]);
    });
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "grid items-center transition-colors duration-150 ease-in-out",
              hoveredRow === rowIndex ? "bg-blue-50" : rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
            )}
            style={getColumnsCSS(fields.length)}
            onMouseEnter={() => setHoveredRow(rowIndex)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <div className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
              <span className={cn(
                "text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center",
                hoveredRow === rowIndex ? "bg-blue-100 text-blue-700" : "text-gray-500"
              )}>
                {rowIndex + 1}
              </span>
            </div>

            {fields.map((field) => (
              <div key={field.name} 
                className={cn(
                  "px-3 py-2 border-r border-gray-200 last:border-r-0 h-full flex items-center",
                  field.required && row[field.name] === null ? "bg-red-50/10" : ""
                )}
              >
                <Field
                  field={field}
                  onChange={(fieldValue) => handleFieldChange(rowIndex, field.name, fieldValue)}
                  value={row[field.name]}
                />
              </div>
            ))}

            <div className="px-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleDelete(rowIndex)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-all duration-150 cursor-pointer opacity-70 hover:opacity-100"
                title="Delete row"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="px-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleEditRow(rowIndex)}
                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-full transition-all duration-150 cursor-pointer opacity-70 hover:opacity-100"
                title="Edit row"
              >
                <PencilIcon className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingRow !== null && (
        <Dialog open={editingRow !== null} onOpenChange={(open) => !open && setEditingRow(null)}>
          <DialogContent className="max-w-3xl">
            <TableInputForm
              row={editingRow.data}
              index={editingRow.index}
              onClose={() => setEditingRow(null)}
              onSave={handleSaveRow}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
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
            {data.length} {data.length === 1 ? 'row' : 'rows'}
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