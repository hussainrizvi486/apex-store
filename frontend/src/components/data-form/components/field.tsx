import { cn } from "@utils/index";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { AutoComplete } from "@components/ui/autocomplete";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { DFInputProps, FieldValue, TypeField, FieldState } from "../index";
import { useEffect, useState } from "react";
import { useDFContext } from "../context";


interface FieldProps extends TypeField {
    onChange?: (value: FieldValue) => FieldValue;
    state?: FieldState | null,
    onBlur?: (value: FieldValue) => FieldValue;
    value?: FieldValue;
    ref?: React.Ref<HTMLElement>;
}


const Label = (props: { field: FieldProps; className?: string }) => {
    const { field } = props;
    return <label className={cn("text-xs block", props.className || "")} htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500 ml-1">*</span>}</label>;
}

const Field: React.FC<FieldProps> = (props) => {
    const { state, type } = props;
    const [className, setClassName] = useState<string>("");




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
                    className={className}
                /> <Label field={props} className="ml-2 text-sm " />
            </div>
        )
    }

    if (type == "select") {
        return (
            <div>
                <div className="mb-1">
                    <Label field={props} className="mb-2" />
                </div>
                <Select onValueChange={handleChange}  >
                    <SelectTrigger className={className}>
                        <SelectValue placeholder={props.placeholder || "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {props.options.map((option, index) => (
                                <SelectItem className="text-sm" key={index} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        )
    }

    if (type == "autocomplete") {
        return (
            <div className="mb-1">

                <Label field={props} className="mb-2" />
                <AutoComplete options={props.options} onChange={handleChange} className={className} />
            </div>
        )
    }


    return (
        <div>
            <div className="mb-1">
                <Label field={props} />
            </div>

            <Input
                className={className}
                name={props.name}
                type={"text"}
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
        <div className="mb-4 max-w-[576px]">
            <div>
                <Field {...props.field} onChange={onChange} state={state} />
            </div>
        </div>
    )
}


export { DFInput };