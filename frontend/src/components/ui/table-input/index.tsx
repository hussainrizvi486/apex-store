import React, { useState, useEffect } from "react";
import { CircleX, FileText, Trash2, Settings as SettingsIcon, Pencil as PencilIcon } from "lucide-react";

import { FieldState, TypeField } from "@components/data-form/types";

import { Button } from "@components/ui/button";
import { AutoComplete } from "@components/ui/autocomplete";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { FieldValue } from "@components/data-form";
import { cn } from "@utils/index";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@components/ui/dialog";


function getColumnsCSS(count: number): React.CSSProperties {
    let styles = "2rem ";
    styles += `repeat(${count}, 1fr) `;
    styles += "2rem 2rem";
    return { gridTemplateColumns: styles };
}


type TableInputState = Array<{ state: FieldState, index: number }>
type TableInputValues = Array<Record<string, FieldValue>>;
interface ContextType {
    fields: Array<TypeField>;
    values: Record<string, FieldValue> | null;
    state: TableInputState;
    setValue: (name: string, value: FieldValue, index: number) => void;
    // onChange: () => void;
    // onAddRow: () => void;
    // onDeleteRow: () => void;
    getValues: () => TableInputValues;
}


const context = React.createContext<ContextType | null>(null);
interface ProviderProps {
    children: React.ReactNode;
    values: Record<string, FieldValue> | null;
    fields: Array<TypeField>;
    // onChange?: (data: TableInputValues) => void;
}

const ContextProvider: React.FC<ProviderProps> = (props) => {
    function getInitialState(fields: Array<TypeField>): TableInputState {
        const state: TableInputState = [];
        fields.forEach((field, index) => {
            state.push({
                state: {
                    error: "",
                    hasError: false,
                    value: field.defaultValue || null,
                    field: field,
                },
                index: index,
            });
        })
        return state
    }

    const { fields, values } = props;
    const [state, setState] = useState<TableInputState>(getInitialState(props.fields));

    const setValue = (name: string, value: FieldValue, index: number) => {
        setState(prev => {
            // const row = prev.find(row => row.index === index);
            // if (!row) return prev;
            // const { state } = row;
            // if (state.value === value) return prev;
            // state.value = value;
            // state.hasError = false;
            // state.error = "";
            return prev;
        })
    };

    const getValues = (): TableInputValues => {
        const values: TableInputValues = [];
        return values;
    }

    return (
        <context.Provider value={{ setValue, getValues, state, fields, values }} >
            {props.children}
        </context.Provider>
    )
}


const useContext = () => {
    const ctx = React.useContext(context);
    if (!ctx) {
        throw new Error("useContext must be used within a ContextProvider");
    }
    return ctx;
}

interface TableInputProps {
    values: Record<string, FieldValue> | null;
    fields: Array<TypeField>;
}
const TableInput: React.FC<TableInputProps> = (props) => {
    const { fields } = props;
    return (
        <ContextProvider values={props.values} fields={props.fields}>
            <TableInputHeader fields={fields} />
            <div className="w-full">
                {/* {props.fields.map((field, index) => (
                    <Field
                        key={index}
                        field={field}
                        value={props.values ? props.values[field.name] : undefined}
                    />
                ))} */}
            </div>
        </ContextProvider>
    )
}

const TableInputHeader: React.FC<{ fields: Array<TypeField> }> = ({ fields }) => {
    return (
        <div className="bg-gray-50 border-b border-gray-200">
            <div
                className="grid items-center h-10"
                style={getColumnsCSS(fields.length)}
            >
                <div className="px-3 flex items-center justify-center border-r border-gray-200">
                    <span className="text-sm font-medium text-gray-600">#</span>
                </div>

                {fields.map((field) => (
                    <div key={field.name} className="px-3 py-2 border-r border-gray-200 last:border-r-0">
                        <div className="text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        {/* {field.description && (
                            <div className="text-xs text-gray-500 mt-1">{field.description}</div>
                        )} */}
                    </div>
                ))}

                <div className="px-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600"><CircleX className="size-4" /></span>
                </div>

                <div className="px-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600"><SettingsIcon className="size-4" /></span>
                </div>
            </div>
        </div>
    );
}

export { TableInput }