import React from "react";
import { DataFormProps } from "./index";
import { DFInput } from "./components/field";
import { Column, Section } from "./components/layout";
import { Button } from "@components/ui/button";
import { integer } from "@utils/index";
import { DFFormObject } from "./utils";
import { DFContextProvider, useDFContext } from "./context";



const DataForm: React.FC<DataFormProps> = (props) => {
    if (!props.fields) {
        return <div className="text-sm">No fields available</div>;
    }
    return (
        <DFContextProvider fields={props.fields} values={props.values || null}>
            <DataFormContent {...props} />
        </DFContextProvider>
    );
};


const DataFormContent: React.FC<DataFormProps> = (props) => {
    const formObject = React.useMemo(() => new DFFormObject(props.fields), [props.fields]);
    const formLayout = formObject.formLayout;
    const formContext = useDFContext();


    const handleSubmit = () => {
        const values = formContext.getValues?.();
        if (!values) {
            return;
        }

        const errors = formObject.validateForm(values);

        if (!Object.keys(errors).length) {
            formContext.getFields()?.forEach((field) => {
                formContext.updateFormState?.((prevState) => {
                    return ({ ...prevState, [field.name]: { ...prevState[field.name], hasError: false, error: "" } });
                })
            })
            props.onSubmit?.(values)
        }
        else {
            Object.keys(errors).forEach((key) => {
                formContext.updateFormState?.((prevState) => {
                    return ({ ...prevState, [key]: { ...prevState[key], hasError: true, error: errors[key] } })
                })
            })
        }
        props.onSubmit?.(values)
    };

    return (
        <div>
            {formLayout.map((section, i) => (
                <Section key={i} label={section.label || ""}>
                    {section.columns?.map((column, columnIndex) => (
                        <Column columnsLength={integer(section.columns?.length)} key={columnIndex}>
                            {column.map((field, fieldIndex) => (
                                <DFInput field={field} key={fieldIndex} setValue={formContext.setFieldValue} />
                            ))}
                        </Column>
                    ))}
                </Section>
            ))}
            <div>
                <Button onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    );
};


export { DataForm }; 