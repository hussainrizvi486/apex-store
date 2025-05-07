/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { Input } from "@components/ui/input";
import { TableInput } from "@components/table-input";
import { AutoComplete } from "@components/ui/autocomplete";
import { TextEditor } from "@components/ui/text-editor";
import { Checkbox } from "@components/ui/checkbox";
import { cn } from "@utils/index";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Spinner } from "./loaders/spinner";





const FileInput = React.forwardRef<HTMLInputElement, any>(
    ({ onChange, value, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        console.log(value)
        return (
            <div className="flex items-center gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild onClick={e => {
                        e.preventDefault();
                    }}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <input type="file" ref={ref} {...props} onChange={onChange} className={cn("block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium", props.className)} />
                    </PopoverTrigger>

                    <PopoverContent sideOffset={5} align="start" alignOffset={5}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()} >
                        <div className="h-40 w-40 flex items-center justify-center cursor-pointer">
                            <img src="https://m.media-amazon.com/images/I/71cPWIae4RL._AC_SL1500_.jpg" alt="" />
                        </div>
                    </PopoverContent>
                </Popover>

            </div >
        );
    }
);

export interface FormFieldType {
    label: string;
    onChange?: (value: any) => void;
    name: string;
    required?: boolean;
    placeholder?: string;
    type: "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "table" | "texteditor" | "checkbox";
    options?: Array<{ label: string; value: string }>;
}

interface FormSection {
    label: string;
    columns: [][];
}

interface DataFormProps {
    formFields: FormSection[];
    values?: {
        [key: string]: any;
    }
}

const FormField: React.FC<{
    field: FormFieldType;
    control: any;
    errors: any;
}> = ({ field, control, errors }) => {
    const error = errors[field.name];
    const hasError = !!error;

    const renderFieldByType = (field: FormFieldType, onChange: (value: any) => void, value: any) => {
        const commonProps = {
            name: field.name,
            placeholder: field.placeholder,
            className: "py-1.5 px-2",
            value,
            onChange: (e: any) => {
                const val = e?.target?.value !== undefined ? e.target.value : e;
                onChange(val);
                field.onChange?.(val);
            },
        };

        switch (field.type) {
            case "text":
                return <Input type="text" {...commonProps} />;
            case "number":
                return <Input type="number" {...commonProps} />;
            case "float":
                return <Input type="number" {...commonProps} />;
            case "file":
                return <FileInput {...commonProps} />;
            case "autocomplete":
                return <AutoComplete {...field} {...commonProps} className="py-1.5 px-2" />;
            case "texteditor":
                return <TextEditor {...field} {...commonProps} />;
            case "table":
                return <TableInput {...field} onChange={(val) => { onChange(val); field.onChange?.(val); }} value={value} />;
            case "checkbox":
                return <Checkbox
                    checked={value} onCheckedChange={(checked) => { onChange(checked); field.onChange?.(checked); }} />;
            default:
                return <Input type="text" {...commonProps} />;
        }
    };

    if (field.type === "checkbox") {
        return (
            <div className="mb-1">
                <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <div className="flex items-center gap-2">
                            <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                                {renderFieldByType(field, onChange, value)}
                            </div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
                                {field.label}  {field.required && <span className="text-destructive">*</span>}
                            </label>
                        </div>
                    )}
                />
                <div>
                    {hasError && <div className="text-destructive text-xs mt-1 ml-1">{error.message}</div>}
                </div>
            </div>
        );
    }

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}  {field.required && <span className="text-destructive">*</span>}
            </label>
            <Controller
                name={field.name}
                control={control}
                rules={{
                    required: field.required ? `${field.label} is required` : false,
                    ...field.validation
                }}
                render={({ field: { onChange, value } }) => (
                    <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                        {renderFieldByType(field, onChange, value)}
                    </div>
                )}
            />
            <div>
                {hasError && <div className="text-destructive text-xs mt-1 ml-1">{error.message}</div>}
            </div>
        </div>
    );
};



const FormSection: React.FC<{
    children: React.ReactNode; label: string;
}> = ({ children, label }) => (
    <div className="mb-4 border-b py-4" >
        <h2 className="text-lg font-semibold mb-2" > {label} </h2>
        {children}
    </div>
);

const FormColumn: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <div className="basis-full" >
        {children}
    </div>
);



const getFieldState = (fields: FormFieldType[], values: object | null) => {
    const state = {};
    for (const field of fields) {
        const value = values ? values[field.name] : null;
        state[field.name] = {
            df: field,
            value: value,
            error: "",
            hasError: false,
        }
    }
    return state;
}

const getFieldsArray = (fields) => {
    const data = []
    for (const i of fields) {
        for (const j of i.columns) {
            for (const k of j) {
                data.push(k)
            }
        }
    }

    return data
}

export const DataForm: React.FC<DataFormProps> = ({ formFields, onSave, values }) => {
    const fieldsArray = getFieldsArray(formFields);
    const defaultValues: Record<string, any> = {};

    fieldsArray.forEach(field => {
        defaultValues[field.name] = values[field.name] !== undefined ? values[field.name] : field.type === "checkbox" ? false : "";
    });
    const [fieldState, setFieldState] = useState(getFieldState(fieldsArray, values));

    const [data, setData] = useState(values || {});

    const formObject = useForm({
        defaultValues,
        mode: "onBlur"
    });

    const { control, handleSubmit, formState: { errors } } = formObject;

    const updateFieldState = (name: string, value: object) => {
        setFieldState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                ...value,
            },
        }));
    }

    const handleChange = (value: any, field: FormFieldType) => {
        setData({ ...data, [field.name]: value });
        updateFieldState(field.name, { value: value });
    }

    const validateForm = () => {
        let validated = true;
        for (const field of fieldsArray) {

            const value = data[field.name];

            if (field.required && !value) {
                validated = false;
                updateFieldState(field.name, {
                    error: "This field is required",
                    hasError: true,
                });
            } else {
                updateFieldState(field.name, {
                    error: "",
                    hasError: false,
                });
            }
        }
        return validated;
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return
        }
        onSave?.(data);
    }

    const onSubmit = (data: Record<string, any>) => {
        onSave?.(data);
    };


    return (
        <div>
            <FormProvider {...formObject}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    {formFields?.map((section, sectionIndex) => (
                        <FormSection key={sectionIndex} label={section.label}>
                            <div className="flex gap-x-2">
                                {section.columns.map((column, columnIndex) => (
                                    <FormColumn key={columnIndex}>
                                        {column?.map((field, fieldIndex) => (
                                            <div className="mb-4" key={fieldIndex}>
                                                <FormField
                                                    field={field}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </div>
                                        ))}
                                    </FormColumn>
                                ))}
                            </div>
                        </FormSection>
                    ))}
                    <button
                        type="submit"
                        className="inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm leading-6 font-semibold text-primary-foreground transition duration-150 ease-in-out hover:bg-gray-700"
                    >
                        Save</button>
                </form>
            </FormProvider>
        </div>
    );
};



