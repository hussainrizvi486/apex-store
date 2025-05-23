import React, { createContext, useContext, useState } from "react";
import { FieldValue, TypeField, FormState } from "./index";


interface DFContextType {
    formState: Record<string, { value: FieldValue; error: string; hasError: boolean }>;
    updateFormState: React.Dispatch<React.SetStateAction<Record<string, { value: FieldValue; error: string; hasError: boolean }>>>;
    setFieldValue: (params: { key: string; value: FieldValue }) => void;
    getFormState: (fields: TypeField[]) => Record<string, { value: FieldValue; error: string; hasError: boolean }>;
}

const DFContext = createContext<DFContextType>({
    formState: {},
    updateFormState: () => { },
    setFieldValue: () => { },
    getFormState: () => ({}),
});

const DFContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getFormState = (fields: TypeField[]): FormState => {
        const state: FormState = {};
        fields.forEach((field) => {
            const key = field.name;
            state[key] = {
                value: field.defaultValue ?? undefined,
                error: "",
                hasError: false,
            };
        });
        return state;
    };

    const [formState, setFormState] = useState<FormState>({});

    const setFieldValue = ({ key, value }: { key: string; value: FieldValue }) => {
        setFormState((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                value,
            },
        }));
    };

    return (
        <DFContext.Provider
            value={{
                formState,
                updateFormState: setFormState,
                setFieldValue,
                getFormState,
            }}
        >
            {children}
        </DFContext.Provider>
    );
};

const useDFContext = () => {
    const context = useContext(DFContext);
    return context;
}

export { DFContext, DFContextProvider, useDFContext }