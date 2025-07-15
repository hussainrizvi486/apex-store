import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FileText, Trash2, Settings as SettingsIcon, Pencil as PencilIcon, DeleteIcon } from "lucide-react";
import { FieldState, TypeField } from "@components/data-form/types";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { FieldValue } from "@components/data-form";
import { cn } from "@utils/index";
import { Dialog, DialogContent } from "@components/ui/dialog";
import { Field } from "./field";


function getColumnsCSS(count: number): React.CSSProperties {
    let styles = "2rem 2rem ";
    styles += `repeat(${count}, 1fr) `;
    styles += "2rem";
    return { gridTemplateColumns: styles };
}

export interface TIFieldState extends FieldState {
    index: number;
}

export interface TFRowState {
    index: number;
    checked?: boolean;
    fields: { [key: string]: TIFieldState };
}

type TableInputState = Array<TFRowState>

type TableInputValues = Array<Record<string, FieldValue>>;
export interface TIContextType {
    fields: TypeField[];
    values: Record<string, FieldValue> | null;
    state: TableInputState;
    setValue: (params: { name: string; value: FieldValue; index: number }) => void;
    addRow: () => void;
    deleteRow: (index: number | number[]) => void;
    editingRow: number | null;
    setEditingRow: (index: number | null) => void;
    onChange?: () => void;
    setRowCheck: (index: number) => void;
    getValues: () => TableInputValues;
}



const context = React.createContext<TIContextType | null>(null);

interface ProviderProps {
    children: React.ReactNode;
    values: Record<string, FieldValue> | null;
    fields: Array<TypeField>;
}

const ContextProvider: React.FC<ProviderProps> = (props) => {
    const { fields } = props;

    function getInitialState(fields: Array<TypeField>, values: TableInputValues): TableInputState {
        const state: TableInputState = [];
        console.log("getInitialState");
        values?.forEach((row, index) => {
            const stateRow: TFRowState = {
                fields: {},
                index: index + 1,
            }

            fields.forEach((field) => {
                const value = row[field.name] || field.defaultValue || null;
                stateRow.fields[field.name] = {
                    index: index + 1,
                    value: value,
                    error: "",
                    hasError: false,
                    field: field,
                };
            })
            state.push(stateRow);
        })
        return state
    }



    const values: TableInputValues = props.values;
    // const values: TableInputValues = [];
    const [state, setState] = useState<TableInputState>(getInitialState(props.fields, values));
    const [editingRow, setEditingRow] = useState<number | null>(null);


    const setValue = React.useCallback((params: { name: string; value: FieldValue; index: number }) => {
        const { index, value, name } = params;

        setState(prev => {
            // Find the row that needs to be updated
            const rowIndex = prev.findIndex(row => row.index === index);
            
            // If row doesn't exist or the value hasn't changed, return the previous state unchanged
            if (rowIndex === -1) return prev;
            const row = prev[rowIndex];
            if (row.fields[name]?.value === value) return prev;
            
            // Create a new state array with the updated row
            const newState = [...prev];
            newState[rowIndex] = {
                ...row,
                fields: {
                    ...row.fields,
                    [name]: {
                        ...row.fields[name],
                        value: value,
                        hasError: false,
                        error: "",
                    }
                }
            };
            
            return newState;
        });
    }, []);

    const setRowCheck = useCallback((index: number) => {

        setState(prev =>
            prev.map(row =>
                row.index === index
                    ? { ...row, checked: !row.checked }
                    : row
            )
        );
    }, [])

    const addRow = useCallback((values?: Record<string, FieldValue>) => {
        const row = { fields: {}, index: state.length + 1 } as TFRowState;
        fields.forEach((field) => {
            const value = values?.[field.name] || field?.defaultValue;
            row.fields[field.name] = {
                index: state.length + 1,
                value: value,
                error: "",
                hasError: false,
                field: field,
            };

        })
        setState((prev) => {
            return [...prev, row];
        });
    }, [])

    const deleteRow = useCallback((index: number | Array<number>) => {

        if (Array.isArray(index)) {
            setState((prev) => {
                return [...prev.filter((row) => !index.includes(row.index))];
            });
        } else {
            setState((prev) => {
                return prev.filter((row) => row.index !== index);
            });
        }

        setEditingRow(null);
    }, [])

    const getValues = useCallback((): TableInputValues => {
        const values: TableInputValues = [];
        state.forEach((row) => {
            const rowValues: Record<string, FieldValue> = {};
            Object.keys(row.fields).forEach((key) => {
                const { fields } = row;
                const value = fields[key].value;
                rowValues[key] = value;
            })
            values.push(rowValues);
        });
        return values;

    }, [state])

    useEffect(() => {
        console.warn(state)
    }, [state])

    const contextValue = useMemo(() => ({
        setRowCheck, setValue, getValues, state, editingRow, setEditingRow, deleteRow, fields, values: props.values, addRow
    }), [setRowCheck, setValue, getValues, state, editingRow, setEditingRow, deleteRow, fields, props.values, addRow])
    return (
        <context.Provider value={contextValue} >
            {props.children}
        </context.Provider>
    )
}


const useTIContext = () => {
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
    return (
        <ContextProvider values={props.values} fields={props.fields}>
            <TableInputMain />
        </ContextProvider>
    )
}


const TableInputMain = () => {
    const context = useTIContext();
    const { addRow, editingRow, state, deleteRow } = context;

    function handleAddRow() {
        addRow();
    }
    const [openRow, setOpenRow] = useState<boolean>(false);

    useEffect(() => {
        if (editingRow !== null) {
            setOpenRow(true);
        } else {
            setOpenRow(false);
        }
    }, [editingRow])

    return (
        <>
            <div className="border border-gray-200 rounded-lg overflow-hidden  mb-4">
                <TableInputHeader fields={context.fields} />
                <div className="w-full">
                    <TableInputData />
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex gap-2 items-center">
                    {
                        state.filter(row => row.checked).length > 0 ?
                            <Button size="sm" variant="destructive" onClick={() => deleteRow(state.filter(row => row.checked).map(row => row.index))}>Delete</Button> : <></>
                    }
                    <Button onClick={handleAddRow} size="sm">Add Row</Button>
                </div>
            </div>

            <Dialog open={openRow} onOpenChange={(value) => {
                if (!value) {
                    context.setEditingRow(null);
                }
                setOpenRow(value)
            }}>
                <DialogContent className="sm:max-w-4xl w-full"  >
                    <EditRowForm />
                </DialogContent>
            </Dialog >
        </>
    )
}

const EditRowForm: React.FC = () => {
    const context = useTIContext();
    const { fields, state, editingRow, deleteRow, addRow } = context;
    const rowState = state.find(row => row.index === editingRow);

    if (editingRow === null || !rowState) return <></>
    const displayRowNumber = editingRow! + 1;

    const handleDelete = () => {
        deleteRow(editingRow!);
    };


    return (
        <div>
            <header className="flex items-center justify-between">
                <div className="font-medium">Editing Row # {displayRowNumber}</div>
                <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 className="size-4" />
                    </Button>
                    <Button size="sm" onClick={addRow}>Insert Below</Button>
                </div>
            </header>

            <div className="py-6">
                {fields.map((field, index) => {
                    return (
                        <div key={index} className="mb-4">
                            <label className="mb-2 text-sm">{field.label}</label>
                            <Field field={field} state={rowState} ctx={context} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


const EmptyTable: React.FC = () => (
    <div className="py-8 flex justify-center">
        <div className="flex flex-col items-center text-gray-500">
            <FileText className="w-12 h-12 mb-2" />
            <div className="text-sm">No data available</div>
            <div className="text-xs text-gray-400">Click "Add Row" to get started</div>
        </div>
    </div>
);

const TableInputData: React.FC = () => {
    const context = useTIContext();
    const { fields, getValues } = context;
    const values = getValues();
    const { setEditingRow, state, setRowCheck } = context;

    function handleEditRow(index: number) {
        setEditingRow(index);
    }


    if (!values?.length) {
        return <EmptyTable />
    }


    return (
        <div className="divide-y divide-gray-200">
            <div>
                {values.map((_, index) => (
                    <div key={index}
                        style={getColumnsCSS(fields.length)}
                        className={cn(
                            "grid items-center transition-colors duration-150 ease-in-out border-b",
                        )}
                    >

                        <div
                            className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
                            <Checkbox onCheckedChange={() => setRowCheck(index + 1)} />
                        </div>

                        <div
                            className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
                            <span className="text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center">
                                {index + 1}
                            </span>
                        </div>

                        {fields.map((field, colIndex) => {
                            const rowState = state.find(row => row.index === index + 1);
                            if (!rowState) return null;

                            return (
                                <div
                                    key={colIndex}
                                    className={cn(
                                        "px-3 py-2 border-r border-gray-200 last:border-r-0 h-full flex items-center",
                                    )}>
                                    <Field field={field} state={rowState} ctx={context} />
                                </div>
                            )
                        })}

                        <div className="px-3 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => handleEditRow(index + 1)}
                                className=" p-1.5 rounded-full transition-all duration-150 cursor-pointer opacity-70"
                                title="Edit row"
                            >
                                <PencilIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

const TableInputHeader: React.FC<{ fields: Array<TypeField> }> = ({ fields }) => {
    return (
        <div className="bg-gray-100 border-b border-gray-200">
            <div
                className="grid items-center h-10"
                style={getColumnsCSS(fields.length)}
            >
                <div
                    className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
                    <Checkbox />
                </div>
                <div className="px-3 flex items-center justify-center border-r border-gray-200">
                    <span className="text-sm font-medium text-gray-600">#</span>
                </div>

                {fields.map((field) => (
                    <div key={field.name} className="px-3 py-2 border-r border-gray-200 last:border-r-0">
                        <div className="text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                    </div>
                ))}

                <div className="px-3 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600"><SettingsIcon className="size-4" /></span>
                </div>
            </div>
        </div>
    );
}

export { TableInput }