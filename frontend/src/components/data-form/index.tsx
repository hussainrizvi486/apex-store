import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, Controller } from "react-hook-form";

import { Button } from "@components/ui/button";
import { cn } from "@utils/index";

import { FieldType, FormField } from "./field";

const Section: React.FC<{
    children: React.ReactNode;
    label: string;
}> = ({ children, label }) => (
    <div className="mb-6 border-b pb-6">
        <h2 className="text-lg font-semibold mb-4">{label}</h2>
        {children}
    </div>
);

const Column: React.FC<{ children: React.ReactNode, columnsLength: number }> = ({ children, columnsLength = 0 }) => (
    <div className={cn("w-full px-2", columnsLength > 0 ? `md:col-span-1` : '')}>
        {children}
    </div>
);

export interface DataFormSection {
    label: string;
    columns?: Array<Array<FieldType>>;
}

interface DataFormProps {
    fields: Array<DataFormSection>;
    values?: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
    submitLabel?: string;
    resetOnSubmit?: boolean;
    isLoading?: boolean;
}

function getSchema(fields: Array<FieldType>) {
    const schemaMap: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        let fieldSchema: z.ZodTypeAny = z.any();

        // Set up validation based on field type
        switch (field.type) {
            case "text":
            case "textarea":
            case "texteditor":
                fieldSchema = z.string().trim();
                break;

            case "number":
                fieldSchema = z.preprocess(
                    (val) => val === "" ? undefined : Number(val),
                    z.number({
                        invalid_type_error: `${field.label} must be a number`,
                    }).int({
                        message: `${field.label} must be a whole number`,
                    })
                );
                break;

            case "float":
                fieldSchema = z.preprocess(
                    (val) => val === "" ? undefined : Number(val),
                    z.number({
                        invalid_type_error: `${field.label} must be a number`,
                    })
                );
                break;

            case "date":
                fieldSchema = z.string().refine(value => !value || !isNaN(Date.parse(value)), {
                    message: `${field.label} must be a valid date format`,
                });
                break;

            case "select":
                fieldSchema = z.string({
                    required_error: `Please select a ${field.label.toLowerCase()}`,
                });
                break;

            case "autocomplete":
                // Handle both string values and Option objects
                fieldSchema = z.union([
                    z.string(),
                    z.object({
                        label: z.string(),
                        value: z.string()
                    }),
                ]);
                break;

            case "checkbox":
                fieldSchema = z.boolean().optional();
                break;

            case "file":
                fieldSchema = z.any().optional();
                break;

            case "table":
                fieldSchema = z.array(z.record(z.string(), z.any())).optional();
                break;

            default:
                fieldSchema = z.any().optional();
        }

        // Apply required validation
        if (field.required) {
            if (field.type === "checkbox") {
                fieldSchema = z.literal(true, {
                    errorMap: () => ({ message: `${field.label} is required` }),
                });
            } else if (field.type === "table") {
                // For tables, require at least one entry if table is required
                fieldSchema = z.array(z.record(z.string(), z.any()))
                    .min(1, { message: `At least one ${field.label} is required` });
            } else {
                fieldSchema = fieldSchema.refine(val => val !== undefined && val !== null && val !== "", {
                    message: `${field.label} is required`,
                });
            }
        } else {
            // If not required, make field optional
            fieldSchema = fieldSchema.optional();
        }

        // Add the schema for this field to our map
        schemaMap[field.name] = fieldSchema;
    });

    return z.object(schemaMap);
}


const getFieldsArray = (fields: DataFormSection[]): FieldType[] => {
    const data: FieldType[] = [];

    // Recursive function to handle nested fields
    const processField = (field: FieldType) => {
        data.push(field);

        // Handle nested fields in table inputs
        if (field.type === "table" && field.fields) {
            field.fields.forEach(processField);
        }
    };

    // Process all fields in all sections and columns
    fields.forEach(section => {
        section.columns?.forEach(column => {
            column.forEach(processField);
        });
    });

    return data;
}


export const DataForm: React.FC<DataFormProps> = ({
    fields,
    values = {},
    onSubmit,
    submitLabel = "Submit",
    resetOnSubmit = false,
    isLoading: externalIsLoading = false
}) => {
    // Memoize field arrays and schema to prevent unnecessary recalculations
    const fieldsArray = React.useMemo(() => getFieldsArray(fields), [fields]);
    const validationSchema = React.useMemo(() => getSchema(fieldsArray), [fieldsArray]);

    const formMethods = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: values,
        mode: "onBlur"
    });

    const { handleSubmit, control, formState: { errors, isSubmitting, isDirty, isLoading: formIsLoading }, reset, setValue } = formMethods;
    const isLoading = externalIsLoading || formIsLoading;

    // Update form values when the values prop changes
    useEffect(() => {
        if (values && Object.keys(values).length) {
            const fieldNames = fieldsArray.map(val => val.name);
            Object.entries(values).forEach(([key, value]) => {
                if (fieldNames.includes(key)) {
                    setValue(key, value, { shouldDirty: false });
                }
            });
        }
    }, [values, fieldsArray, setValue]);

    const processSubmit = (data: Record<string, any>) => {
        onSubmit(data);
        if (resetOnSubmit) {
            reset();
        }
    };


    return (
        <div className="w-full">
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(processSubmit)}>
                    {fields.map((section, sectionIndex) => (
                        <Section key={`section-${sectionIndex}`} label={section.label}>                            <div className={`grid grid-cols-1 md:grid-cols-${section.columns?.length || 1} gap-4`}>
                            {section.columns?.map((columns, columnIndex) => (
                                <Column key={`column-${sectionIndex}-${columnIndex}`} columnsLength={section.columns?.length || 1}>
                                    {columns.map((field) => {
                                        const fieldValue = values ? values[field.name] : undefined;
                                        return (
                                            <div key={`field-${field.name}`} className="mb-4">
                                                <Controller
                                                    name={field.name}
                                                    control={control}
                                                    defaultValue={fieldValue}
                                                    render={({ field: { onChange, value } }) => (
                                                        <FormField
                                                            field={{
                                                                ...field,
                                                                value: value !== undefined ? value : fieldValue,
                                                                onChange: (newValue) => onChange(newValue)
                                                            }}
                                                            onChange={(newValue) => onChange(newValue)}
                                                            state={{
                                                                hasError: !!errors[field.name],
                                                                error: errors[field.name]?.message as string
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        );
                                    })}
                                </Column>
                            ))}
                        </div>
                        </Section>
                    ))}                    <div className="flex justify-end mt-6 gap-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isLoading || !isDirty}
                            className="px-6 py-2"
                        >
                            {isSubmitting || isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : submitLabel}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );

};