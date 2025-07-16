import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FileText, Trash2, Settings as SettingsIcon, Pencil as PencilIcon } from "lucide-react";
// import { TypeField } from "@components/data-form/types";
import { Button } from "@components/ui/button";
// import { TIContextType, TableInputState, TableInputValues, TIFieldState, TFRowState } from "./types";
import { useTIContext } from ".";
import { Field } from "./field";


export const Form: React.FC = () => {
    const context = useTIContext();
    const { fields, state, setEditingRow, editingRow, deleteRow, addRow } = context;
    const rowState = state.find(row => row.id === editingRow);

    if (editingRow === null || !rowState) return <></>


    const handleDelete = () => {
        deleteRow(rowState.id);
    };

    return (
        <div>
            <header className="flex items-center justify-between">
                <div className="font-medium">Editing Row # {rowState.index}</div>
                <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 className="size-4" />
                    </Button>
                    <Button size="sm" onClick={() => {
                        setEditingRow(null);
                        addRow()
                    }}>Insert Below</Button>
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