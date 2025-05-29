import React, { useState } from "react";
import { decimal, cn } from "@utils/index";



type InputType = "text"
    | "number"
    | "float"
    | "currency"
    | "date"
    | "email";

interface InputProps {
    name?: string
    placeholder?: string
    className?: string
    value?: string,
    required?: boolean
    type?: InputType
    precision?: number,
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
}



const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
    const [value, setValue] = useState(props.value || "");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        props.onChange?.(e.target.value);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        setValue(e.target.value);
        props.onBlur?.(e.target.value);
    }


    return (
        <input
            {...props}
            ref={ref}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={value}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
                "w-full px-2 py-1 h-8 my-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className
            )}
        />
    )
})


export { Input };