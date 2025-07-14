import React, { useState, useEffect } from "react";
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

type TableInputState = Array<{
    [key: string]: TIFieldState;
}>

type TableInputValues = Array<Record<string, FieldValue>>;
interface ContextType {
    fields: TypeField[];
    values: Record<string, FieldValue> | null;
    state: TableInputState;
    setValue: (params: { name: string; value: FieldValue; index: number }) => void;
    addRow: () => void;
    deleteRow: (index: number | number[]) => void;
    editingRow: number | null;
    setEditingRow: (index: number | null) => void;
    onChange?: () => void;
    getValues: () => TableInputValues;
}



const context = React.createContext<ContextType | null>(null);

interface ProviderProps {
    children: React.ReactNode;
    values: Record<string, FieldValue> | null;
    fields: Array<TypeField>;
}

const ContextProvider: React.FC<ProviderProps> = (props) => {
    const { fields } = props;

    function getInitialState(fields: Array<TypeField>, values: TableInputValues): TableInputState {
        const state: TableInputState = [];
        values.forEach((row, index) => {
            const stateRow: Record<string, TIFieldState> = {}
            fields.forEach((field) => {
                const value = row[field.name] || field.defaultValue || null;
                stateRow[field.name] = {
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

    const values: TableInputValues = props.values || [];
    const [state, setState] = useState<TableInputState>(getInitialState(props.fields, values));
    const [editingRow, setEditingRow] = useState<number | null>(null);

    const setValue = (params: { name: string; value: FieldValue; index: number }) => {
        const { index, value, name } = params;
        setState(prev => {
            const newState = [...prev];
            const row = newState[index];

            if (!row) return prev;
            if (row[name].value === value) return prev;

            row[name] = {
                ...row[name],
                value: value,
                hasError: false,
                error: "",
            };

            return newState;
        });
    };

    const addRow = (values?: Record<string, FieldValue>) => {
        const row = {} as Record<string, TIFieldState>;
        fields.forEach((field) => {
            const value = values?.[field.name] || field.defaultValue;
            row[field.name] = {
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
    }

    const deleteRow = (index: number | Array<number>) => {
        if (Array.isArray(index)) {
            setState((prev) => {
                return prev.filter((_, i) => !index.includes(i));
            });
        } else {
            setState((prev) => {
                return prev.filter((_, i) => i !== index);
            });
        }

        setEditingRow(null);
    }

    function getValues(): TableInputValues {
        const values: TableInputValues = [];

        state.forEach((row) => {
            const rowValues: Record<string, FieldValue> = {};
            Object.keys(row).forEach((key) => {
                const value = row[key].value;
                rowValues[key] = value;
            })
            values.push(rowValues);
        });
        return values;
    }
    useEffect(() => {
        console.warn(state)
    }, [state])
    return (
        <context.Provider value={{
            setValue,
            getValues,
            state,
            editingRow,
            setEditingRow,
            deleteRow,
            fields,
            values: props.values,
            addRow
        }} >
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
    const context = useContext();
    const { addRow, editingRow } = context;

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
                    <Button size="sm" variant="destructive" className={cn("hidden")}>Delete</Button>
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

    const rowState = state[editingRow!];
    if (editingRow === null || !rowState) return <></>
    const displayRowNumber = editingRow! + 1;

    const handleDelete = () => {
        // Fix: Pass the actual array index (0-based) to deleteRow
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
                        <div key={field.name} className="mb-4">
                            <label className="mb-2 text-sm">{field.label}</label>
                            <Field field={field} />
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

    const { setEditingRow, editingRow } = context;

    function handleEditRow(index: number) {
        setEditingRow(index);
    }

    useEffect(() => {
        console.log("Editing row changed:", editingRow);
    }, [editingRow])

    if (!values?.length) {
        return <EmptyTable />
    }

    const handleChange = (index: number, fieldName: string, value: FieldValue) => {
        context.setValue(fieldName, value, index);
    }
    return (
        <div className="divide-y divide-gray-200">
            <div>
                {values.map((row, index) => (
                    <div key={index}
                        style={getColumnsCSS(fields.length)}
                        className={cn(
                            "grid items-center transition-colors duration-150 ease-in-out border-b",
                        )}
                    >
                        <div
                            className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
                            <Checkbox />
                        </div>
                        <div
                            className="px-3 py-3 flex items-center justify-center border-r border-gray-200 h-full">
                            <span className={cn(
                                "text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center",
                            )}>
                                {index + 1}
                            </span>
                        </div>

                        {fields.map((field, colIndex) => (
                            <div
                                key={colIndex}
                                className={cn(
                                    "px-3 py-2 border-r border-gray-200 last:border-r-0 h-full flex items-center",
                                )}>
                                <Field field={field} />
                            </div>
                        ))}

                        <div className="px-3 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => { handleEditRow(index) }}
                                className=" p-1.5 rounded-full transition-all duration-150 cursor-pointer opacity-70"
                                title="Edit row"
                            >
                                <PencilIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
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

export { TableInput, useTIContext }