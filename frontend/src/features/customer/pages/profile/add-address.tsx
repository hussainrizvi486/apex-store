import { FormValues } from "@components/data-form"
import { DataForm } from "@components/data-form/main"
import { Header } from "@components/layouts"
import { useAddressMutation } from "@features/auth/api/address"
import { useNavigate } from "react-router-dom"

const fields = [

    { label: "Title", name: "title", type: "text", required: true },
    { label: "Address Line 1", name: "address_line_1", type: "text", required: true },
    { label: "Address Line 2", name: "address_line_2", type: "text", required: true },
    { label: "City", name: "city", type: "text", required: true },
    { label: "State", name: "state", type: "text", required: true },
    { label: "", columnBreak: true },
    { label: "Country", name: "country", type: "text", required: true },
    { label: "Postal Code", name: "postal_code", type: "text", required: true },
    { label: "Email", name: "email", type: "email", },
    { label: "Phone Number", name: "phone_number", type: "text", },
]


export const AddAddress = () => {
    const mutation = useAddressMutation();
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues) => {
        console.log("Submitted Values:", values);
        await mutation.mutateAsync(values);
        await navigate("/profile");
    }


    return (
        <>
            <Header />
            <div className="mx-auto max-w-6xl py-6">
                <div className="mb-6 font-semibold text-lg">Add Address</div>
                <DataForm fields={fields} onSubmit={handleSubmit} />
            </div>
        </>
    )
}

