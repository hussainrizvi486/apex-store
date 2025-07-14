/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TypeField, FieldValue } from "@components/data-form/types";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { AutoComplete } from "@components/ui/autocomplete";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { cn } from "@utils/index";
import { TIFieldState, useTIContext } from ".";



interface FieldProps {
    field: TypeField;
    onChange?: (value: FieldValue) => void;
    onBlur?: (value: FieldValue) => void;
    value?: FieldValue;
    state: TIFieldState;

}

const Field: React.FC<FieldProps> = React.memo((props) => {
    const ctx = useTIContext()

    const { field, onBlur, value, state } = props;
    const [className, setClassName] = useState<string>("");


    const onChange = (value: FieldValue) => {
        ctx.setValue({ name: field.name, value, index: state.index });
        console.log("Field onChange", field.name, value);
    }


    useEffect(() => {
        if (state.hasError) {
            setClassName("ring-2 ring-red-500 ring-offset-2");
        }
        else {
            setClassName("");
        }
    }, [state.hasError]);


    if (field.type === "checkbox") {
        return (
            <Checkbox
                name={field.name}
                id={field.name}
                checked={Boolean(value)}
                onCheckedChange={(checked) => onChange?.(checked)}
                onBlur={() => onBlur?.(value)}
            />
        );
    }

    if (field.type === "textarea") {
        return (
            <textarea
                name={field.name}
                className={cn("w-full text-sm p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)}
                rows={6}
                onChange={(event) => onChange?.(event.target.value)}
                onBlur={(event) => onBlur?.(event.target.value)}
                value={value as string || ""}
            />
        );
    }

    if (field.type === "select") {
        return (
            <Select
                value={value as string || ""}
                onValueChange={(val) => onChange?.(val)}
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

        // const defaultValue = value ? typeof value === "string" ? value : JSON.stringify(value) : "";
        return (
            <AutoComplete
                label={field.label}
                className={className}
                onChange={onChange}
                // value={value}
                defaultValue={value}
                getOptions={field.getOptions}
                renderOption={field.renderOption}
            />
        );
    }

    // if (field.type === "custom" && field.component) {
    //     const form = null;
    //     return field.component({ form });
    // }

    if (field.type == "date") {
        return (
            <Input
                name={field.name}
                className={className}
                type="date"
                defaultValue={value as string || ""}
                onChange={(event) => onChange?.(event.target.value)}
                onBlur={(event) => onBlur?.(event.target.value)}
                // value={value as string || ""}
                placeholder={field.placeholder}
            />
        )
    }
    return (
        <Input
            name={field.name}
            className={className}
            type={field.type === "number" || field.type === "float" || field.type === "currency" ? "number" : "text"}
            onChange={(event) => onChange?.(event.target.value)}
            onBlur={(event) => onBlur?.(event.target.value)}
            defaultValue={value as string || ""}
            placeholder={field.placeholder}
        />
    );
});

export { Field }