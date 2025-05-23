import { cn } from "@utils/index";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { AutoComplete } from "@components/ui/autocomplete";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { BaseField, DFInputProps, FieldValue } from "../index";


interface FieldProps extends BaseField {
    onChange?: (value: FieldValue) => void;
    onBlur?: () => FieldValue;
    value?: FieldValue;
    ref?: React.Ref<HTMLElement>;
    control: object;
}


const Label = (props: { field: FieldProps; className?: string }) => {
    const { field } = props;
    return <label className={cn("text-xs", props.className || "")} htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500 ml-1">*</span>}</label>;

}

const Field: React.FC<FieldProps> = (props) => {
    const { type } = props;

    function handleChange(value: FieldValue) {
        props?.onChange?.(value);
    }

    function handleBlur(value: FieldValue) {
        props?.onBlur?.(value);
    }

    if (type === "checkbox") {
        return (
            <div className="flex items-center">
                <Checkbox name={props.name} id={props.name}
                    onCheckedChange={handleChange}
                /> <Label field={props} className="ml-2 text-sm" />
            </div>
        )
    }

    if (type == "select") {
        return (
            <div>
                <div className="mb-1">
                    <Label field={props} className="mb-2" />
                </div>
                <Select onValueChange={handleChange} >
                    <SelectTrigger >
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
                <Label field={props} />
                <AutoComplete options={props.options} onChange={handleChange} />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-1">
                <Label field={props} />
            </div>

            <Input
                name={props.name}
                type={props.type}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    )


}
const DFInput: React.FC<DFInputProps> = (props) => {
    const { field, setValue } = props

    const onChange = (value: FieldValue) => {
        setValue({ value, key: field.name });
    }

    return (
        <div className="mb-2 h-16">
            <div>
                <Field {...field} onChange={onChange} />
            </div>
        </div>
    )
}


export { DFInput };