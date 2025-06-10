import { FormValues } from "@components/data-form"
import { DataForm } from "@components/data-form/main"
import { Header } from "@components/layouts"
import { useAddressMutation } from "@features/auth/api/address"
import { Link,useNavigate } from "react-router-dom"
import { ArrowLeft } from 'lucide-react';

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
            <div className="p-4 max-w-6xl mx-auto">
                <div className='flex gap-3 items-center mt-4 mb-6'>
                    <Link to='/profile' className='flex items-center'>
                        <ArrowLeft size={22} />
                    </Link>
                    <h2 className="text-lg font-semibold ">Add Address</h2>
                </div>
                <DataForm fields={fields} onSubmit={handleSubmit} />
            </div>
        </>
    )
}

