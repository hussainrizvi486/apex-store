import { FieldValue, FieldState, TypeField } from "@components/data-form/types";

export interface TIFieldState extends FieldState { index: number }
export interface TFRowState {
    id: string;
    index: number;
    checked?: boolean;
    fields: { [key: string]: TIFieldState };
}

export type TableInputState = Array<TFRowState>;
export type TableInputValues = Array<Record<string, FieldValue>>;


export interface TIContextType {
    fields: TypeField[];
    values: Record<string, FieldValue> | null;
    state: TableInputState;
    editingRow: string | null;
    setValue: (params: { name: string; value: FieldValue; id: string }) => void;
    addRow: () => void;
    deleteRow: (index: string | string[]) => void;
    setEditingRow: (index: string | null) => void;
    onChange?: () => void;
    setRowCheck: (index: string) => void;
    getValues: () => TableInputValues;
}


export type TypeFieldValue = FieldValue;