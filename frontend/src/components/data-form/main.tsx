import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { DataFormProps, BaseField } from "./index";
import { Input } from "@components/ui/input";
import { DFInput } from "./components/field";

const getSchema = (fields: BaseField[]) => {
    const schemaMap: Record<string, z.ZodTypeAny> = {};
    for (const field of fields) {
        let fieldSchema: z.ZodTypeAny = z.unknown();

        if ([
            "text",
            "textarea",
            "texteditor",
        ].includes(field.type)) {
            fieldSchema = z.string().trim();
        }
        else if (field.type == "checkbox") {
            fieldSchema = z.boolean();
        }
        else if (field.type == "table") {
            fieldSchema = z.array(z.record(z.string(), z.any())).optional();
        }

        else if (["select", "multiselect", "autocomplete"].includes(field.type)) {
            fieldSchema = z.union([
                z.string(),
                z.object({
                    label: z.string(),
                    value: z.string(),
                }),
            ]);
        }

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
        }

        else {
            fieldSchema = fieldSchema.optional();
        }


        schemaMap[field.name] = fieldSchema;
    }
    return z.object(schemaMap);
}

const DataForm: React.FC<DataFormProps> = (props) => {
    const formSchema = React.useMemo(() => getSchema(props.fields), [props.fields]);

    const formObject = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {},
    })

    return (
        <FormProvider {...formObject}>
            <div>
                <div className="text-lg">DataForm</div>
            </div>

            <div>
                {props.fields.map((field, index) => {
                    return (
                        <Controller key={index}
                            name={field.name}
                            control={formObject.control}
                            render={() => (
                                <DFInput label={field.label} name={field.name} type={field.type} options={field.options} />
                            )}
                        />

                    )
                })}
            </div>
        </FormProvider>
    )
}

export { DataForm };