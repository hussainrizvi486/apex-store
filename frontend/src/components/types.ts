/* eslint-disable @typescript-eslint/no-explicit-any */

export type FieldType = "text" | "textarea" | "date" | "select" | "number" | "autoc omplete" | "float" | "table";

export interface Option {
    label: string;
    value: string;
}

export interface BaseField {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
}
