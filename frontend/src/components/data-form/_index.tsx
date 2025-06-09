import React from "react";

export type FieldType = "text" | "number" | "float" | "currency" | "date" | "file" | "textarea" | "select" | "checkbox" | "custom" | "table" | "autocomplete";

export interface TypeField<T extends FieldType = FieldType> {
    name: string
    label?: string
    type?: FieldType
    required?: boolean
    placeholder?: string;
    hidden?: boolean;
    description?: string;
    onChange?: (value: T) => void;
    defaultValue?: FieldValue,

    sectionBreak?: boolean;
    columnBreak?: boolean;
}


interface DataFormProps {
    fields: TypeField[]
}

const DataForm: React.FC<DataFormProps> = (props) => {
    return (
        <></>
    )
}