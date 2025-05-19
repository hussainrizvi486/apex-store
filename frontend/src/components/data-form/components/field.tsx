import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { BaseField } from "../index";
import { AutoComplete } from "@components/ui/autocomplete";



const Field: React.FC<BaseField> = (props) => {
    const { type } = props;

    if (type === "checkbox") {
        return (
            <div className="flex items-center">
                <Checkbox name={props.name} id={props.name} /> <label className="text-xs ml-2" htmlFor={props.name}>{props.label}</label>
            </div>
        )
    }

    if (type == "autocomplete") {
        console.log(props.options)
        return (
            <div className="mb-1">
                <label className="text-xs">{props.label}</label>
                <AutoComplete options={props.options} />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-1">
                <label className="text-xs">{props.label}</label>
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