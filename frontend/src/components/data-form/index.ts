/**
 * Represents an option for select/multiselect/autocomplete fields
 */
export interface TypeOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
    description?: string;
    icon?: React.ReactNode;
}

/**
 * Union of all possible field values
 */
export type FieldValue =
    | string
    | number
    | boolean
    | File
    | Date
    | TypeOption
    | TypeOption[]
    | Record<string, any>
    | FieldValue[]
    | null;


/**
 * Generic validator function type
 */
export type FieldValidator<T = FieldValue> = (value: T) => { isValid: boolean; errorMessage?: string };


/**
 * Defines all supported field types in the dataform
 */
export type FieldType =
    | "text"
    | "number"
    | "float"
    | "currency"
    | "date"
    | "file"
    | "textarea"
    | "texteditor"
    | "select"
    | "multiselect"
    | "checkbox"
    | "custom"
    | "table"
    | "autocomplete";


/**
* Base interface for all field types
*/
export interface BaseField<T extends FieldType = FieldType> {
    label: string;
    name: string;
    type: T;
    required?: boolean;
    disabled?: boolean;
    sectionBreak: boolean;
    columnBreak: boolean;
    hidden?: boolean;
    placeholder?: string;
    description?: string;
    options: TypeOption[]
    getOptions?: (value: T) => Promise<TypeOption[]>;
    currency?: string;
    precision?: number;
    onChange?: (value: T) => void;
    validators?: FieldValidator<T>;
    defaultValue?: FieldValue,
}

export interface TypeField<T extends FieldType = FieldType> {
    label: string;
    name: string;
    component?: React.FC;
    type?: T;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    placeholder?: string;
    description?: string;
    onChange?: (value: T) => void;
    options?: TypeOption[]
    getOptions?: () => Promise<TypeOption[]>;
    currency?: string;
    precision?: number;
    validators?: FieldValidator<T>;
    defaultValue?: FieldValue,
    sectionBreak?: boolean;
    columnBreak?: boolean;
    fields?: TypeField[]
}


/** Form values type */

export type FormValues = Record<string, FieldValue>

export interface DataFormProps {
    fields: TypeField<FieldType>[];
    values?: FormValues;
    onChange?: (data: FormValues) => void;
    onSubmit?: (data: FormValues) => void;
    onValue?: (data: FormValues) => void;
    onReset?: () => void;
}


export interface DFInputProps {
    field: TypeField<FieldType>;
    setValue: (params: { value: FieldValue; key: string }) => void;
}


export interface TypeDFSection {
    label?: string;
    name?: string;
    columns?: TypeField[][];
    sectionBreak: boolean;
}

export interface FieldState {
    value?: FieldValue;
    error?: string;
    hasError?: boolean;
    isLoading?: boolean
}

/**
 * Represents the layout of the data form as an array of sections
 */
export type TypeDFLayout = Array<TypeDFSection>;
export type FormState = Record<string, FieldValue>