export interface TypeOption {
    label: string;
    value: string;
    disabled?: boolean;
    description?: string;
    icon?: React.ReactNode;
}

export type FieldType = "text" | "number" | "float" | "currency" | "date" | "file" | "textarea" | "select" | "checkbox" | "custom" | "table" | "autocomplete";

export interface TypeField<T extends FieldType = FieldType> {
    label: string;
    name: string;
    component?: React.FC;
    type?: T;
    onChange?: (value: T) => void;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    placeholder?: string;
    fields?: TypeField[]
}