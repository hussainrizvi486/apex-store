/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TypeField } from "@components/data-form/types";
import { Input } from "@components/ui/input";
import { TypeFieldValue, TIContextType, TFRowState } from "@components/table-input/types"
import { Checkbox } from "@components/ui/checkbox";
import { AutoComplete, OptionType } from "@components/ui/autocomplete";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { cn } from "@utils/index";


interface FieldProps {
    field: TypeField;
    onChange?: (value: TypeFieldValue) => void;
    onBlur?: (value: TypeFieldValue) => void;
    state: TFRowState;
    ctx: TIContextType
}

const Field: React.FC<FieldProps> = React.memo((props) => {
    const { field, onBlur, state, ctx } = props;

    const [className, setClassName] = useState<string>("");
    const fieldState = state.fields[field.name];
    const value = useMemo(() => fieldState.value, [fieldState.value]);


    const handleChange = useCallback((newValue: TypeFieldValue) => {
        console.log(field.name, newValue, state.id);
        ctx.setValue({ name: field.name, value: newValue, id: state.id });
    }, [field.name, state.id, ctx]);



    useEffect(() => {
        if (!fieldState?.hasError) {
            setClassName("");
            return;
        }

        setClassName("ring-2 ring-red-500 ring-offset-2");

    }, [fieldState?.hasError]);

    // const memoized = useMemo(() => {
    if (field.type === "checkbox") {
        return (
            <Checkbox
                name={field.name}
                id={state.id}
                checked={Boolean(value)}
                onCheckedChange={(checked) => handleChange?.(checked)}
                onBlur={() => onBlur?.(value)}
            />
        );
    }

    if (field.type === "textarea") {
        return (
            <textarea
                id={state.id}
                name={field.name}
                className={cn("w-full text-sm p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)}
                rows={6}
                onChange={(event) => handleChange?.(event.target.value)}
                onBlur={(event) => onBlur?.(event.target.value)}
                defaultValue={value as string}
            // value={value as string || ""}
            />
        );
    }

    if (field.type === "select") {
        return (
            <Select
                id={state.id}
                value={value as string || ""}
                onValueChange={(val) => handleChange?.(val)}
            >
                <SelectTrigger className={cn(className)}
                    onBlur={() => onBlur?.(value)}
                >
                    <SelectValue placeholder={field.placeholder || "Select"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {field.options?.map((option) => (
                            <SelectItem className="text-sm" key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        );
    }

    if (field.type === "autocomplete") {
        return (
            <AutoComplete

                label={field.label}
                className={className}
                onChange={handleChange}
                options={field.options}
                // value={value}
                defaultValue={value as OptionType}
                getOptions={field.getOptions}
                renderOption={field.renderOption}
            />
        );
    }

    if (field.type === "custom" && field.component) {
        return field.component();
    }

    if (field.type == "date") {
        return (
            <Input
                name={field.name}
                className={className}
                type="date"
                defaultValue={value as string || ""}
                onChange={(event) => handleChange?.(event.target.value)}
                onBlur={(event) => onBlur?.(event.target.value)}
                placeholder={field.placeholder}
            />
        )
    }
    return (
        <Input
            name={field.name}
            id={state.id}
            className={className}
            type={field.type === "number" || field.type === "float" || field.type === "currency" ? "number" : "text"}
            onChange={(event) => handleChange?.(event.target.value)}
            onBlur={(event) => onBlur?.(event.target.value)}
            defaultValue={value as string || ""}
            placeholder={field.placeholder}
        />
    );

    // }, [field, value, className, handleChange, onBlur, state.id])
    // console.log(state.id)
    // return memoized;
});

export { Field }