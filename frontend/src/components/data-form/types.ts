export type TypeOption = {
    label: string;
    value: string;
}

export type FieldState = {
    hasError: boolean;
    error: string;
    value: FieldValue;
    field: TypeField;
}

export type FormState = Record<string, FieldState>;
export type FieldType = "text" | "number" | "float" | "currency" | "date" | "file" | "textarea" | "texteditor" | "select" | "checkbox" | "table" | "autocomplete" | "custom" | "section" | "column";
export type FieldValue = string | number | boolean | File | Date | TypeOption | TypeOption[] | Record<string, any> | null | undefined;
export type FormValues = Record<string, FieldValue>;
export type ValidationFunction = (value: FieldValue) => boolean | string;

export interface TypeField<T extends FieldType = FieldType> {
    name: string;
    label: string;
    type: T;
    required?: boolean;
    options?: TypeOption[];
    placeholder?: string;
    sectionBreak?: boolean;
    columnBreak?: boolean;
    component?: (setValue: (value: FieldValue) => void,) => React.FC<any>;
    validate?: ValidationFunction;
    onChange?: (value: FieldValue) => void;
    onBlur?: (value: FieldValue) => void;
    getOptions?: () => Promise<TypeOption[]>;
    renderOption?: () => React.ReactNode;
    dependsOn?: (values: FormValues) => boolean;
    requiredOn?: (values: FormValues) => boolean;
    readOnlyOn?: (values: FormValues) => boolean;
}

export interface DataFormProps {
    // fields: TypeField[];
    // values?: FormValues | null;
}



export type TypeDFSection = {
    label?: string;
    name?: string;
    columns?: TypeField[][];
    // sectionBreak: boolean;
}
export type TypeDFLayout = Array<TypeDFSection>;