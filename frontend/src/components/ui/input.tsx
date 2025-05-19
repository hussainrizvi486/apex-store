import React from "react";
import { decimal, cn } from "@utils/index";

const DEFAULT_PRECISION = 2;
const DEFAULT_PLACEHOLDERS = {
    "text": "Enter text",
    "textarea": "Enter text",
    "number": "0",
    "float": "0.00",
}

type InputType = "text" | "number" | "float" | "number";

interface InputProps {
    name?: string
    placeholder?: string
    className?: string
    value?: string,
    required?: boolean
    type?: InputType
    precision?: number,
    onChange?: (value: any) => void
    onBlur?: (value: any) => void
}

const INPUT_CLASS_TYPE = {
    "text": "text-left",
    "number": "text-right",
    "float": "text-right",
}


// function getValue(input: InputProps, value: any) {

// }

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        props.onChange?.(value);
    }


    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        props.onBlur?.(e.target.value);
    }

    return (
        <input
            {...props}
            ref={ref}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
                "w-full px-2 py-1 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className
            )}
        />
    )
})


export { Input };