import { X as CloseIcon } from "lucide-react";
import { CustomFieldProps, TypeField } from "./types";
import { DataForm, DataFormProvider } from "@components/data-form/main"
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Button } from "@components/ui/button";
import { TableInput } from "@components/table-input";

import { Dialog, DialogTrigger, DialogContent } from "@components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";

const fields: Array<TypeField> = [
    {
        type: "section",
        label: "",
        sectionBreak: true,

        name: "product_details_section",
    },
    {
        label: "Item Price",
        type: "table",
        name: "item_prices",
        fields: [
            {
                label: "Price List",
                name: "price_list",
                type: "autocomplete",
                options: [
                    { label: "Retail", value: "retail" },
                    { label: "Wholesale", value: "wholesale" },
                    { label: "Distributor", value: "distributor" },
                    { label: "Custom", value: "custom" },
                ],
                // getOptions: async () => {
                //     const request = await authAPI.get("query/pricelist");
                //     return request.data.map(v => ({ label: v.name, value: v.id }));
                // },
                required: true,
            },
            {
                label: "Price",
                type: "currency",
                name: "price",
                required: true,

            },
            {
                label: "Valid From",
                type: "date",
                name: "valid_from",
            },
            {
                label: "Valid Till",
                type: "date",
                name: "valid_till"
            }
        ]
    },
    {
        label: "Type",
        name: "product_type",
        type: "select",
        defaultValue: "variant",
        options: [
            { label: "Product", value: "product" },
            { label: "Template", value: "template" },
            { label: "Variant", value: "variant" },
        ],
    },
    {
        label: "Template",
        name: "template",
        type: "autocomplete",
        dependsOn: (values) => values.product_type === "variant",
        requiredOn: (values) => values.product_type === "variant",
    },
    {
        label: "Title",
        name: "product_name",
        type: "text",
        required: true,
        placeholder: "Enter product title",
    },
    {
        label: "Category",
        name: "category",
        required: true,
        type: "autocomplete",
        // getOptions: async () => {
        //     const request = await authAPI.get("api/get/categories/list");
        //     return request.data.map(v => ({ label: v.name, value: v.id, meta: v }));
        // },
    },
    {
        label: "Description",
        name: "description",
        type: "textarea",
    },

    {
        label: "UOM",
        name: "uom",
        type: "autocomplete",
        // getOptions: async () => {
        //     const request = await authAPI.get("query/uom");
        //     return request.data.map(v => ({ label: v.name, value: v.id }));
        // }
    },
    {
        label: "Disable",
        name: "disable",
        type: "checkbox",
    },

    {
        label: "Media",
        name: "media_section",
        sectionBreak: true,
        type: "section",

    },

    {
        label: "Images",
        name: "media_files",
        type: "custom",
        component: (props) => <ProductMedia  {...props} />,
    },
    {
        label: "Pricing",
        sectionBreak: true,
        name: "pricing_section",
        type: "section",
    },

]

const ProductMedia: React.FC<CustomFieldProps> = ({ form }) => {
    interface FileTypes {
        file?: File;
        url?: string;
        id: string;
        name?: string
    }

    const [data, setData] = useState<Array<FileTypes> | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files).map((file) => {
                return {
                    name: file.name,
                    file: file,
                    id: crypto.randomUUID(),
                }
            })

            setData(files);
            form?.setValue?.("media_files", files);
        }
    }

    const removeFile = (index: number) => {
        if (data?.length) {
            const updated = data.filter((_, idx) => idx !== index);
            setData(updated.length > 0 ? updated : null);
            form?.setValue?.("media_files", updated);
        }
    }

    if (!data?.length) {
        return (
            <div className="relative">
                <input type="file" multiple className="absolute inset-0 border opacity-0 cursor-pointer" accept="image/*" onChange={(e) => { handleChange(e) }} />
                <div className="border border-dashed border-gray-600 rounded-md py-6 px-2">
                    <div className="flex items-center justify-center flex-col">
                        <Button variant="secondary" size="sm" >Upload images</Button>
                        <div className="mt-1 text-xs">Add Single or Multiple Images here</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div >
            <ReactSortable list={data} setList={setData} className="flex flex-wrap gap-2" animation={200}
                delayOnTouchStart={true}
                delay={2}>

                {data.map((file, i) => {
                    if (file) {
                        return (
                            <div key={i} className="h-32 w-32 shadow-sm rounded-md overflow-hidden relative group border border-gray-200 ">
                                <button
                                    onClick={() => removeFile(i)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10 cursor-pointer "
                                >
                                    <CloseIcon className="size-4" />
                                </button>

                                <img src={file.file ? URL.createObjectURL(file.file) : ''} alt={`Uploaded file ${i}`} className="h-full w-full object-contain" />
                                <div className="absolute bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-50 text-white text-xs p-0.5 px-1 truncate line-clamp-1">
                                    {file.name || ""}
                                </div>
                            </div>
                        )

                    }
                }
                )}

            </ReactSortable>
        </div>
    )
}

const Index = () => {
    return (
        
        <div className="p-4 max-w-6xl mx-auto" >
            <div>

                <Dialog >
                    <DialogTrigger asChild>
                        <Button >Open</Button>
                    </DialogTrigger>
                    <DialogContent>

                        <Popover>
                            <PopoverTrigger>
                                <Button >Open popover</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">bABY</PopoverContent>
                        </Popover>

                    </DialogContent>
                </Dialog>
            </div>
            <br />
            <br />
            <br />
            <TableInput fields={[
                {
                    label: "Price List",
                    name: "price_list",
                    type: "autocomplete",
                    options: [
                        { label: "Retail", value: "retail" },
                        { label: "Wholesale", value: "wholesale" },
                        { label: "Distributor", value: "distributor" },
                        { label: "Custom", value: "custom" },
                    ],
                    required: true,
                },
                {
                    label: "Price",
                    defaultValue: 0,
                    type: "currency",
                    name: "price",
                    required: true,

                },
                {
                    label: "Valid From",
                    type: "date",
                    name: "valid_from",
                },
                {
                    label: "Valid Till",
                    type: "date",
                    name: "valid_till"
                }
            ]}
                values={[
                    {
                        price_list: { label: "Retail", value: "retail" },
                        price: 100,
                        valid_from: "2025-07-01",
                        valid_till: "2025-07-31"
                    },
                    {
                        price_list: { label: "Wholesale", value: "wholesale" },
                        price: 90,
                        valid_from: "2025-07-01",
                        valid_till: "2025-07-31"
                    },
                    {
                        price_list: { label: "Distributor", value: "distributor" },
                        price: 85,
                        valid_from: "2025-07-01",
                        valid_till: "2025-12-31"
                    },
                    {
                        price_list: { label: "Custom", value: "custom" },
                        price: 120,
                        valid_from: "2025-06-15",
                        valid_till: "2025-08-15"
                    },
                    {
                        price_list: { label: "Retail", value: "retail" },
                        price: 105,
                        valid_from: "2025-08-01",
                        valid_till: "2025-08-31"
                    },
                    {
                        price_list: { label: "Wholesale", value: "wholesale" },
                        price: 88,
                        valid_from: "2025-08-01",
                        valid_till: "2025-12-31"
                    },
                    {
                        price_list: { label: "Distributor", value: "distributor" },
                        price: 80,
                        valid_from: "2025-07-15",
                        valid_till: "2025-09-15"
                    },
                    {
                        price_list: { label: "Custom", value: "custom" },
                        price: 130,
                        valid_from: "2025-07-01",
                        valid_till: "2025-10-01"
                    },
                    {
                        price_list: { label: "Retail", value: "retail" },
                        price: 110,
                        valid_from: "2025-09-01",
                        valid_till: "2025-09-30"
                    },
                    {
                        price_list: { label: "Wholesale", value: "wholesale" },
                        price: 95,
                        valid_from: "2025-10-01",
                        valid_till: "2025-12-31"
                    }
                ]}

            />
            {/* <DataFormProvider fields={fields}>
                <DataForm />
            </DataFormProvider> */}
        </div>
    )
}


export { Index };