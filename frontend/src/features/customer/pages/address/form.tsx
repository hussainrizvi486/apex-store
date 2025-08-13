import React from "react";
import { useParams } from "react-router-dom";
import { DataForm } from "@components/data-form/main";
import { TypeField } from "@components/data-form/index";
import { Button } from "@components/ui/button";


const fields: TypeField[] = [
    {
        label: "Title",
        name: "title",
        type: "text",
    }, {
        label: "Address Type",
        name: "address_type",
        type: "select",
        options: [
            { label: "Home", value: "home" },
            { label: "Office", value: "office" },
            { label: "Other", value: "other" }
        ]
    }, {
        label: "Address Line 1",
        name: "address_line_1",
        type: "text",
    }, {
        label: "Address Line 2",
        name: "address_line_2",
        type: "text",
    }, {
        label: "Country",
        name: "country",
        type: "text",
    }, {
        label: "State/Province/Region",
        name: "state",
        type: "text",
    }, {
        label: "City/Town",
        name: "city",
        type: "text",
    }, {
        label: "Postal Code/ZIP",
        name: "postal_code",
        type: "text",
    }, {
        label: "Email Address",
        name: "email",
        type: "text",
    }, {
        label: "Phone Number",
        name: "phone_number",
        type: "text",
    }, {
        label: "Default Address",
        name: "default",
        type: "checkbox",
    }
];

const Index = () => {
    const { id, action } = useParams();

    return (
        <div>
            <div className="text-lg font-medium">Add a new address</div>
            <div className="p-2 bg-white rounded-md">
                <DataForm fields={fields} DFTrigger={
                    <div>
                        <Button className="w-full">Save Address</Button>
                    </div>
                } />
            </div>
        </div>
    )
}


export default Index;