import React, { createContext, useState } from "react";
import { z } from "zod";
import { DataFormProps, BaseField, FieldValue, TypeField, TypeDFLayout, TypeDFSection, FormValues } from "./index";
import { DFInput } from "./components/field";
import { Column, Section } from "./components/layout";
import { Button } from "@components/ui/button";
import { DFContextProvider, useDFContext } from "./context";
import { integer } from "@utils/index";

class DFFormObject {
    fields: TypeField[];
    formLayout: TypeDFLayout;

    constructor(fields: TypeField[]) {
        this.fields = fields;
        this.formLayout = this.buildLayout();
    }


    buildSections() {
        const sections: TypeDFSection[] = this.fields.filter(field => field.sectionBreak);

        if (!sections.length) {
            sections.push({ label: '', sectionBreak: true });
        }
        return sections;
    }

    buildLayout() {
        let layout: TypeDFLayout = [];
        const sections = this.buildSections();

        sections.forEach(section => {
            let startIndex = this.fields.findIndex(v => v.name === section.name);

            let columnIndex = 0;
            let columns: TypeField[][] = [[]];

            for (let i = startIndex + 1; i < this.fields.length; i++) {
                const field = this.fields[i];

                if (field.sectionBreak) break;

                if (field.columnBreak === true) {
                    columnIndex += 1;
                    columns.push([]);
                } else {
                    columns[columnIndex].push(field);
                }
            }

            layout.push({
                label: section.label,
                name: section.name,
                columns: columns,
            });
        });

        return layout;
    }
}

// const getSchema = (fields: BaseField[]) => {
//     const schemaMap: Record<string, z.ZodTypeAny> = {};
//     for (const field of fields) {
//         let fieldSchema: z.ZodTypeAny = z.unknown();

//         if ([
//             "text",
//             "textarea",
//             "texteditor",
//         ].includes(field.type)) {
//             fieldSchema = z.string().trim();
//         }
//         else if (field.type == "checkbox") {
//             fieldSchema = z.boolean();
//         }
//         else if (field.type == "table") {
//             fieldSchema = z.array(z.record(z.string(), z.any())).optional();
//         }

//         else if (["select", "multiselect", "autocomplete"].includes(field.type)) {
//             fieldSchema = z.union([
//                 z.string(),
//                 z.object({
//                     label: z.string(),
//                     value: z.string(),
//                 }),
//             ]);
//         }

//         if (field.required) {
//             if (field.type === "checkbox") {
//                 fieldSchema = z.literal(true, {
//                     errorMap: () => ({ message: `${field.label} is required` }),
//                 });
//             } else if (field.type === "table") {
//                 // For tables, require at least one entry if table is required
//                 fieldSchema = z.array(z.record(z.string(), z.any()))
//                     .min(1, { message: `At least one ${field.label} is required` });
//             } else {
//                 fieldSchema = fieldSchema.refine(val => val !== undefined && val !== null && val !== "", {
//                     message: `${field.label} is required`,
//                 });
//             }
//         }

//         else {
//             fieldSchema = fieldSchema.optional();
//         }


//         schemaMap[field.name] = fieldSchema;
//     }
//     return z.object(schemaMap);
// }

const getFormState = (fields: TypeField[]) => {
    let state: Record<string, FieldValue> = {};

    fields.forEach((field) => {
        const key = field.name;
        state[key] = {
            value: field.defaultValue || undefined,
            error: "",
            hasError: false,
        }
    })
    return state
}



const DataForm: React.FC<DataFormProps> = (props) => {
    if (!props.fields) {
        return <div className="text-sm">No fields available</div>;
    }
    return (
        <DFContextProvider
        >
            <DataFormContent {...props} />
        </DFContextProvider>
    );
};

const DataFormContent: React.FC<DataFormProps> = (props) => {
    const context = useDFContext();
    const formObject = React.useMemo(() => new DFFormObject(props.fields), [props.fields]);
    const formLayout = formObject.formLayout;


    const handleSubmit = (values: FormValues) => {
        props.onSubmit?.(values)
    };

    return (
        <div>
            {formLayout.map((section, i) => (
                <Section key={i} label={section.label || ""}>
                    {section.columns?.map((column, columnIndex) => (
                        <Column columnsLength={integer(section.columns?.length)} key={columnIndex}>
                            {column.map((field, fieldIndex) => (
                                <DFInput field={field} key={fieldIndex} />
                            ))}
                        </Column>
                    ))}
                </Section>
            ))}
            <div>
                <Button>Save</Button>
            </div>
        </div>
    );
};


export { DataForm }; 