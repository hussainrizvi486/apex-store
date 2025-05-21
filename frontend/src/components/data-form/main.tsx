import React, { useState } from "react";
import { z } from "zod";
import { DataFormProps, BaseField, FieldValue } from "./index";
import { DFInput } from "./components/field";
import { Column, Section } from "./components/layout";
import { Button } from "@components/ui/button";
import { fields } from "./test";



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

const getFormState = (fields: BaseField[]) => {
    let state = {};

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
    // const formSchema = React.useMemo(() => getSchema(props.fields), [props.fields]);
    const [formState, setFormState] = useState(getFormState(props.fields));



    const setFieldValue = (params: { key: string, value: FieldValue }) => {
        setFormState((prevState) => ({
            ...prevState,
            [params.key]: {
                ...prevState[params.key],
                value: params.value,
            }
        }))
    }

    console.log("formState", formState)
    function getFormValues() {
        const values = {};
        Object.keys(formState).forEach((key) => {
            values[key] = formState[key].value;
        })

        return values;
    }


    const onSubmit = () => {
        console.log("formState", getFormValues());
    }

    const makeFormLayout = () => {
        let layout = [];
        const { fields } = props;
        fields.filter(val => val.sectionBreak).forEach((i) => {

            let section = { label: i.label };
            let start = fields.findIndex((v) => v.name == i.name);


            if (start == undefined) {
                return;
            }

            // console.log(start)

            let columnIndex = 0;
            let columns: BaseField[][] = [[]];

            for (let i = start + 1; i < fields.length; i++) {
                const element = fields[i];
                if (element.sectionBreak) {
                    break;
                }

                if (element.columnBreak == true) {
                    columnIndex += 1;
                    columns.push([])
                    continue;
                }
                else {
                    console.log(columnIndex, columns);
                    columns[columnIndex].push(element);
                }

            }
            section.columns = columns.filter(v => v.length > 0);
            layout.push(section)
        });

        return layout;
    }

    const formLayout = makeFormLayout()
    return (
        <div>

            <div>
                {formLayout.map((section, i) => {
                    return (<Section key={i} label={section.label}>
                        {
                            section.columns?.map((column) => {
                                return (
                                    <Column columnsLength={section.columns.length} key={i}>
                                        {column.map((field, index) => {
                                            return (
                                                <DFInput field={field} key={index} setValue={setFieldValue} />
                                            )
                                        })}
                                    </Column>
                                )
                            })
                        }

                    </Section>)
                })}
            </div>
            <div>
                <Button onClick={onSubmit}>Save</Button>
            </div>
        </div>
    )
}

export { DataForm }; 