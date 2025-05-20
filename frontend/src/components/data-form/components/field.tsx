import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { BaseField, FieldValue } from "../index";
import { AutoComplete } from "@components/ui/autocomplete";
import { useFormContext } from "react-hook-form";
import { cn } from "@utils/index";

interface FieldProps extends BaseField {
    onChange?: (value: FieldValue) => void;
    onBlur?: () => FieldValue;
    value?: FieldValue;
    ref?: React.Ref<any>;
}


const Label = (props: { field: FieldProps; className?: string }) => {
    const { field } = props;
    return <label className={cn("text-xs", props.className || "")} htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500 ml-1">*</span>}</label>;

}

const Field: React.FC<FieldProps> = (props) => {
    const { formState: { errors } } = useFormContext();
    const { type } = props;
    const errorMessage = errors[props.name]?.message as string;

    console.log(errorMessage);
    if (type === "checkbox") {
        return (
            <div className="flex items-center">
                <Checkbox name={props.name} id={props.name} /> <Label field={props} className="ml-2" />
            </div>
        )
    }

    if (type == "autocomplete") {
        return (
            <div className="mb-1">
                <Label field={props} className="ml-2" />
                <AutoComplete options={props.options} />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-1">
                <Label field={props} className="ml-2" />
            </div>

            <Input
                name={props.name}
                type={props.type}
            />
        </div>
    )


}
const DFInput: React.FC<BaseField> = (props) => {

    return (
        <div className="mb-4">
            <Field {...props} />
        </div>

    )
}


export { DFInput };