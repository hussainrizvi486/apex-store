import React, { createContext, useContext, useState } from "react";
import { FieldValue, TypeField, FormState, FormValues } from "./index";


interface DFContextType {
    formState?: FormState;
    fields: TypeField[];
    getFields: () => TypeField[];
    getValues?: () => FormValues;
    updateFormState?: React.Dispatch<React.SetStateAction<Record<string, { value: FieldValue; error: string; hasError: boolean }>>>;
    setFieldValue?: (params: { key: string; value: FieldValue }) => void;
    getFormState?: (fields: TypeField[]) => Record<string, { value: FieldValue; error: string; hasError: boolean }>;
}

const DFContext = createContext<DFContextType>({ fields: [], getFields: () => [], getFormState: () => ({}) });

const DFContextProvider: React.FC<{ children: React.ReactNode, fields: TypeField[], values: FormValues | null }> = ({ children, fields, values }) => {
    const getFormState = (): FormState => {
        const state: FormState = {};
        fields.forEach((field) => {
            const key = field.name;
            const value = values?.[key];
            state[key] = {
                name: key,
                value: value,
                error: "",
                hasError: false,
            };
        });
        return state;
    };

    const [formState, setFormState] = useState<FormState>(getFormState());

    const setFieldValue = ({ key, value }: { key: string; value: FieldValue }) => {
        setFormState((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                value,
            },
        }));
    };

    const getValues = (): FormValues => {
        const values: FormValues = {};
        fields.forEach((f) => {
            if (!f.sectionBreak && !f.columnBreak) {
                values[f.name] = null;
            }
        })

        Object.keys(formState).forEach((key) => {
            if (Object.keys(values).includes(key)) {
                const field = fields.find((f) => f.name === key);
                if (!field) {
                    return
                }

                const value = formState[key]?.value;

                if (field.type === "autocomplete") {
                    values[key] = typeof value == "object" ? value?.value : value;
                } else {
                    values[key] = value;
                }
            }
        });
        return values;
    }


    const getFields = () => {
        return fields.filter(v => !v.sectionBreak && !v.columnBreak);
    }
    return (
        <DFContext.Provider
            value={{
                formState: formState,
                getFields: getFields,
                getValues: getValues,
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