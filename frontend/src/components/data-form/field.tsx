import React from "react";
import { Input } from "@components/ui/input";
import { TableInput } from "@components/table-input";
import { AutoComplete } from "@components/ui/autocomplete";
import { TextEditor } from "@components/ui/text-editor";
import { Checkbox } from "@components/ui/checkbox";
import { Option } from "@components/types";
import { cn } from "@utils/index";
import { FileInput } from "@components/ui/file-inpu";

export type FieldValueType = string | number | boolean | undefined | null | Option | Record<string, Value>[];
export interface FieldType {
    fields?: FieldType[];
    label: string;
    name: string;
    onChange?: (value: FieldValueType) => void;
    required?: boolean;
    placeholder?: string;
    type: "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "table" | "texteditor" | "checkbox" | "file";
    getOptions?: () => Promise<{ label: string; value: string }[]>;
    renderOption?: () => React.ReactNode;
    value?: FieldValueType;
    options?: Array<{ label: string; value: string }>;
}

interface FieldProps {
    field: FieldType;
    onChange: (value: FieldValueType, field: FieldType) => void;
    state: { hasError: boolean; error?: string };
}



export const FormField: React.FC<FieldProps> = ({ field, onChange, state }) => {
    const { hasError, error } = state;

    const handleChange = (value: FieldValueType) => {
        onChange(value, field);
        field.onChange?.(value);
    };

    const renderField = () => {
        const props = {
            id: field.name,
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            className: "py-1.5 px-2",
            value: field.value as string | number | undefined | Option,
            onChange: (e: any) => handleChange(e.target?.value !== undefined ? e.target.value : e),
        };

        switch (field.type) {
            case "text":
            case "number":
            case "float":
                return <Input type={field.type} {...props} />;

            case "file":
                return <FileInput type={field.type} {...props} />;


            case "textarea":
                return <textarea name={props.name} className={cn("p-2 shadow-sm border", props.className)} />;

            case "texteditor":
                return <TextEditor
                    // value={field.value as string}
                    onChange={(value) => handleChange(value)}
                />;

            case "select":
                return (
                    <select {...props}>
                        <option value="">Select an option</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "autocomplete":
                return (
                    <AutoComplete
                        options={field.options}
                        renderOption={field.renderOption}
                        value={field.value as Option | undefined}
                        getOptions={field.getOptions}
                        onChange={(value) => handleChange(value)}
                        className="py-1.5 px-2"
                    />
                );

            case "checkbox":
                return (
                    <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={Boolean(field.value)}
                        onCheckedChange={(checked) => handleChange(checked)}
                        className={props.className}
                        required={field.required}
                    />
                );

            case "table":
                return (
                    <TableInput
                        fields={field.fields || []}
                        label={field.label}
                        onChange={(value) => handleChange(value)}
                        value={field.value}
                    />
                );

            default:
                return <div>Unsupported field type: {field.type}</div>;
        }
    };

    // Checkbox has a different layout
    if (field.type === "checkbox") {
        return (
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                        {renderField()}
                    </div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
                        {field.label}{field.required && <span className="text-destructive">*</span>}
                    </label>
                </div>
                {hasError && error && (
                    <div className="text-destructive text-xs mt-1 ml-1">{error}</div>
                )}
            </div>
        );
    }

    // Standard layout for all other field types
    return (
        <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={field.name}>
                {field.label}{field.required && <span className="text-destructive">*</span>}
            </label>
            <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                {renderField()}
            </div>
            {hasError && error && (
                <div className="text-destructive text-xs mt-1 ml-1">{error}</div>
            )}
        </div>
    );
};