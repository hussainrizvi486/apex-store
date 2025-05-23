import React from "react";
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

// const formatValue = (value: string) => {
//     return value.replace(/[^0-9.]/g, "");
// }


const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        props.onChange?.(value);
    }


    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        props.onBlur?.(e.target.value);
    }

    // console.log(formatValue(props.value || ""));

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
                "w-full px-2 py-1 h-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className
            )}
        />
    )
})


export { Input };