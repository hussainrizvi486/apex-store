import { cn } from "@utils/index";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { AutoComplete } from "@components/ui/autocomplete";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { DFInputProps, FieldValue, TypeField, FieldState } from "../index";
import { useEffect, useState } from "react";
import { useDFContext } from "../context";
import { TableInput } from "@components/ui/table-input";
import { TextEditor } from "@components/ui";
import { StepBack } from "lucide-react";



interface FieldProps extends TypeField {
    state?: FieldState | null;
    className?: string;
    onChange?: (value: FieldValue) => FieldValue;
    onBlur?: (value: FieldValue) => FieldValue;
    value?: FieldValue;
    ref?: React.Ref<HTMLElement>;
}


const Label = (props: { field: FieldProps; className?: string }) => {
    const { field } = props;
    return <label className={cn("text-sm block", props.className || "")} htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500 ml-1">*</span>}</label>;
}


export const BaseField: React.FC<FieldProps> = (props) => {
    const { state, type } = props;

    const [className, setClassName] = useState<string>();

    function handleChange(value: FieldValue) {
        props?.onChange?.(value);
    }

    function handleBlur(value: FieldValue) {
        props?.onBlur?.(value);
    }


    useEffect(() => {
        if (state?.hasError) {
            setClassName("ring ring-offset-3 ring-destructive");
        }
        else {
            setClassName("");
        }
    }, [state, state?.hasError])

    if (!type) {
        return <></>
    }

    if (type === "checkbox") {
        return (
            <Checkbox name={props.name} id={props.name}
                onCheckedChange={handleChange}
                className={cn(props.className, className)}
            />
        )
    }
    if (type == "select") {
        return (
            <main>
                <Select onValueChange={handleChange} >
                    <SelectTrigger className={cn(props.className, className)}
                    >
                        <SelectValue placeholder={props.placeholder || "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {props.options?.map((option, index) => (
                                <SelectItem className="text-sm" key={index} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select >
            </main>

        )
    }

    if (type == "autocomplete") {
        return (
            <AutoComplete options={props.options} getOptions={props.getOptions} onChange={handleChange} className={cn(props.className, className)}
            />

        )
    }

    if (type == "table") {
        return (
            <TableInput fields={props.fields} />
        )
    }

    if (type === "date") {
        return (
            <Input
                className={cn(props.className, className)}
                name={props.name}
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
            />
        )
    }


    if (["currency", "float", "number"].includes(type)) {
        return (
            <input className={cn(
                "w-full px-2 py-1 h-8 my-2 text-right rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className, props.className,
            )}
                type="number"
                placeholder={type == "number" ? "0" : "0.00"}
                name={props.name}

                onChange={(event) => handleChange(event.target.value)}
                onBlur={(event) => handleBlur(event.target.value)}
            />
        )
    }
    return (
        <Input
            className={cn(props.className, className)}
            name={props.name}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    )
}


export const Field: React.FC<FieldProps> = (props) => {
    const { state, type } = props;
    const defaultValue = state?.value;
    const [className, setClassName] = useState<string>();


    function handleChange(value: FieldValue) {
        props?.onChange?.(value);
    }

    function handleBlur(value: FieldValue) {
        props?.onBlur?.(value);
    }


    useEffect(() => {
        if (state?.hasError) {
            setClassName("ring ring-offset-3 ring-destructive");
        }
        else {
            setClassName("");
        }
    }, [state, state?.hasError])


    if (type === "checkbox") {
        return (
            <div className="flex items-center ">
                <Checkbox name={props.name} id={props.name}
                    onCheckedChange={handleChange}
                    className={cn(props.className, className)}
                    defaultChecked={Boolean(defaultValue)}
                /> <Label field={props} className="ml-2 text-sm" />
            </div>
        )
    }

    if (type == "custom") {
        return props.component?.({ onChange: handleChange, onBlur: handleBlur, state }) || <></>;
    }

    if (type == "select") {
        return (
            <div>
                <div className="mb-1">
                    <Label field={props} className="mb-2" />
                </div>
                <Select onValueChange={handleChange} defaultValue={typeof defaultValue === "object" ? defaultValue?.id : defaultValue} >
                    <SelectTrigger className={cn(props.className, className)}

                    >
                        <SelectValue placeholder={props.placeholder || "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {props.options?.map((option, index) => (
                                <SelectItem className="text-sm" key={index} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div >

        )
    }


    if (type == "autocomplete") {
        return (
            <div className="mb-1">
                <Label field={props} className="mb-2" />
                <AutoComplete options={props.options} getOptions={props.getOptions} onChange={handleChange} className={cn(props.className, className)}
                    value={defaultValue}
                />
            </div>
        )
    }

    if (type == "table") {
        return (
            <div>
                <Label field={props} className="mb-2" />
                <TableInput fields={props.fields} onChange={handleChange} defaultValue={defaultValue} />
            </div>
        )
    }

    if (type == "textarea") {
        return (
            <>
                <Label field={props} className="mb-2" />
                <textarea
                    onChange={(event) => handleChange(event.target.value)}
                    className={cn(
                        "w-full px-2 py-1 h-24 my-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className, props.className,)}
                    defaultValue={defaultValue || ""}
                >

                    {/* {defaultValue || ""} */}
                </textarea>
            </>
        )
    }

    return (
        <div>
            <Label field={props} />
            <Input
                className={cn(props.className, className)}
                name={props.name}
                type="text"
                value={defaultValue || ""}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    )
}


const DFInput: React.FC<DFInputProps> = (props) => {
    const fieldName = props.field.name;
    const onChange = (value: FieldValue) => {
        props.setValue?.({ value, key: fieldName });
        return value;
    }

    const context = useDFContext();
    const state = context.formState?.[fieldName];
    return (
        <div className="mb-4">
            <div>
                <Field {...props.field} onChange={onChange} state={state} />
            </div>
        </div>
    )
}


export { DFInput };