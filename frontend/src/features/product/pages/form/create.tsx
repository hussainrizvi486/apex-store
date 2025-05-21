import { DataForm } from "@components/data-form/main";
import { fieldsObject } from "@components/data-form/test";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import React from "react";

const Index = () => {
    const [fields, setFields] = React.useState("Product");

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-2">
                <div className="text-lg font-medium">Model Form</div>
            </div>

            <div className="mb-4 border-b py-4">
                <div className="text-sm font-medium mb-1">Select Form</div>
                <Select onValueChange={(value) => setFields(fieldsObject[value])} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Available Models</SelectLabel>
                            {Object.keys(fieldsObject).map((key) => (
                                <SelectItem className="text-sm" key={key} value={key}>
                                    {key}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {fields && (
                <div>
                    <DataForm fields={fieldsObject["Product"]} />
                </div>
            )}
        </div>
    );
};

export default Index;
