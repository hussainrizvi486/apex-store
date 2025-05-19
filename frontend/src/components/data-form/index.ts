
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
    hidden?: boolean;
    placeholder?: string;
    description?: string;
    onChange?: (value: T) => void;
    validators?: FieldValidator<T>[];
    defaultValue?: FieldValue,
}


/**
 * Number input field interface
 */
export interface NumberField extends BaseField<"number" | "float" | "currency"> {
    min?: number;
    max?: number;
    step?: number;
    currency?: string;
    precision?: number;
}

export interface SelcetField extends BaseField<"number" | "float" | "currency"> {
    min?: number;
    max?: number;
    step?: number;
    currency?: string;
    precision?: number;
}



/** Form values type */

type FormValues = Record<string, FieldValue>

export interface DataFormProps {
    fields: BaseField<FieldType>[];
    values?: FormValues;
    onChange?: (data: FormValues) => void;
    onValue?: (data: FormValues) => void;
    onReset?: () => void;
}

// export interface Field {
//     label: string,
//     name: string,
//     type: FieldType,
//     options?: Array<{ label: string; value: string }>,
//     onChange?: (value: FieldValue) => void,
//     required?: boolean,
//     placeholder?: string,
//     getOptions?: () => Promise<TypeOption[]>,
//     validator?: (value: FieldValue) => boolean,
//     renderOption?: () => React.ReactNode,
//     value?: FieldValue,
//     fields?: Field[],
// }



