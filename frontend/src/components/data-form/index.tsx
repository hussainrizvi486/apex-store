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
    <div className={cn("w-full px-2", `lg:w-1/${columnsLength}`)}>
        {children}
    </div>
);

interface DataFormProps {
    fields: Array<{
        label: string;
        columns?: Array<Array<FieldType>>;
    }>;
    values?: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
    submitLabel?: string;


}

function getSchema(fields: Array<FieldType>) {
    const schemaMap: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        let fieldSchema = z.any();

        // Set up validation based on field type
        switch (field.type) {
            case "text":
            case "textarea":
            case "texteditor":
                fieldSchema = z.string();
                break;

            case "number":
                fieldSchema = z.number().or(z.string().regex(/^\d+$/).transform(Number));
                break;
            case "float":
                fieldSchema = z.number().or(z.string().regex(/^\d*\.?\d*$/).transform(Number));
                break;
            // case "date":
            //     fieldSchema = z.string().refine(value => !value || !isNaN(Date.parse(value)), {
            //         message: "Invalid date format",
            //     });
            //     break;
            case "select":
            case "autocomplete":
                fieldSchema = z.string();
                break;
            case "checkbox":
                fieldSchema = z.boolean().optional();
                break;
            case "file":
                fieldSchema = z.any().optional();
                break;
            default:
                fieldSchema = z.any().optional();
        }

        if (field.required) {
            if (field.type === "checkbox") {
                fieldSchema = z.literal(true, {
                    errorMap: () => ({ message: `${field.label} is required` }),
                });
            } else {
                fieldSchema = fieldSchema.refine(val => val !== undefined && val !== null && val !== "", {
                    message: `${field.label} is required`,
                });
            }
        } else {
            fieldSchema = fieldSchema.optional();
        }

        schemaMap[field.name] = fieldSchema;
    });


    return z.object(schemaMap);
}


const getFieldsArray = (fields) => {

    const data: Array<FieldType> = []
    fields.forEach(section => {
        section.columns?.forEach(column => {
            column.forEach(field => {
                data.push(field);
            });

        });
    });

    return data;
}


export const DataForm: React.FC<DataFormProps> = ({
    fields,
    values = {},
    onSubmit,
    submitLabel = "Submit"
}) => {

    const fieldsArray = getFieldsArray(fields);
    const validationSchema = getSchema(fieldsArray);

    const formMethods = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: values,
        mode: "onBlur"
    });

    const { handleSubmit, control, formState: { errors, isSubmitting, isDirty, isLoading }, reset, setValue } = formMethods;

    useEffect(() => {
        if (values && Object.keys(values).length) {
            // reset(values);
            Object.entries(values).forEach(([key, value]) => {
                if (fieldsArray.map(val => val.name).includes(key)) {
                    setValue(key, value);
                }
            });
        }
    }, [])

    const processSubmit = (data: Record<string, any>) => {
        onSubmit(data);
    };


    return (
        <div className="w-full">
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(processSubmit)}>
                    {fields.map((section, sectionIndex) => (
                        <Section key={`section-${sectionIndex}`} label={section.label}>
                            {/* <div className="flex flex-wrap -mx-2"> */}
                            <div className={`grid grid-cols-${section.columns?.length} gap-4`}>
                                {section.columns?.map((columns, columnIndex) => (
                                    <Column key={`column-${sectionIndex}-${columnIndex}`} columnsLength={columns.length}>
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
                    ))}
                    <div className="flex justify-end mt-6 gap-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isLoading || !isDirty}
                            className="px-6 py-2"
                        >
                            {isSubmitting || isLoading ? "Submitting..." : submitLabel}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );

};