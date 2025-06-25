import { DataForm } from "@components/data-form/main";
import { FormValues, TypeField } from "@components/data-form";
import { authAPI } from "@features/auth/api";
import { Button } from "@components/ui/button";
import React, { useCallback, useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const formField: Array<TypeField> = [
    {
        label: "",
        sectionBreak: true,
        name: "product_details_section",
    },
    {
        label: "Type",
        name: "product_type",
        type: "select",
        options: [
            { label: "Product", value: "product" },
            { label: "Template", value: "template" },
            { label: "Variant", value: "variant" },
        ],
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
        getOptions: async () => {
            const request = await authAPI.get("api/get/categories/list");
            return request.data.map(v => ({ label: v.name, value: v.id }));
        }
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
        getOptions: async () => {
            const request = await authAPI.get("query/uom");
            return request.data.map(v => ({ label: v.name, value: v.id }));
        }
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
    },

    {
        label: "Images",
        name: "media_files",
        type: "custom",
        component: (props) => <ProductMedia {...props} />,
    },
    {
        label: "Pricing",
        sectionBreak: true,
        name: "pricing_section",
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
                getOptions: async () => {
                    const request = await authAPI.get("query/pricelist");
                    return request.data.map(v => ({ label: v.name, value: v.id }));
                },
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
    }
]

const ProductMedia = ({ onChange, onBlur, state }) => {
    const [files, setFiles] = useState<File[] | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files);
            setFiles(fileArray);
            onChange?.(fileArray);
        }
    }

    const removeFile = (index: number) => {
        if (files?.length) {
            const updated = files.filter((_, idx) => idx !== index);
            setFiles(updated.length > 0 ? updated : null);
            onChange?.(updated);
        }
    }

    if (!files?.length) {
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
        <div className="flex flex-wrap gap-2">
            {files.map((file, i) => (
                <div key={i} className="h-32 w-32 shadow-sm rounded-md overflow-hidden relative group border border-gray-200">
                    <button
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10 cursor-pointer "
                    >
                        <X className="size-4" />
                    </button>
                    <img src={URL.createObjectURL(file)} alt={`Uploaded file ${i}`} className="h-full w-full object-contain" />
                    <div className="absolute bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-50 text-white text-xs p-0.5 px-1 truncate line-clamp-1">
                        {file.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

const useProductMutation = () => {
    return useMutation({
        mutationKey: ["create-product"],
        mutationFn: async (data: FormData) => {
            const request = await authAPI.post("api/product/create", data)
            return request.data;
        }
    })
}


// const defaultValues = {
//     "product_type": "product",
//     "product_name": " Joomra Women's Trail Running Barefoot Shoes | Wide Toe Box Minimalist Sneakers | Zero Drop ",
//     "category": "d9b2a1f4-5d48-4f33-aa55-dfbad1735c61",
//     "description": " Joomra Women's Trail Running Barefoot Shoes | Wide Toe Box Minimalist Sneakers | Zero Drop ",
//     "disable": false,
//     "media_files": [],
//     "item_prices": [
//         {
//             "price_list": "a149a427-5406-49aa-8316-f5049d4a9430",
//             "price": "41.99",
//             "valid_from": "",
//             "valid_till": ""
//         }
//     ],
// }


const useProductQuery = (id: string) => {
    console.log(id);
    return useQuery({
        queryKey: ["admin-product-detail", id],
        queryFn: async () => {
            const response = await authAPI.get(`api/get/product/detail?id=${id}`);
            return response.data;
        },
        enabled: !!id
    });
};

const EditProduct = ({ id }: { id: string }) => {
    const { data: product, isLoading } = useProductQuery(id);

    const handleSubmit = () => { };
    console.log(product)
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>Product not found</div>;
    }
    const values = {
        product_name: product.product_name,
        description: product.description,
    }
    return (
        <div>
            <div>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="font-semibold">Edit Product</h1>
                </div>

                <div className="bg-white p-2">
                    <DataForm fields={formField} onSubmit={handleSubmit} values={values} />
                </div>
            </div>
        </div>
    )
}
const Index = () => {
    const defaultValues = {};
    const { id } = useParams<{ id: string | undefined }>();
    console.log(id)

    if (id) {
        return <EditProduct id={id} />;
    }

    const { mutate: createProduct, isLoading } = useProductMutation();

    const handleSubmit = useCallback((d: FormValues) => {
        const data = { ...d };
        console.log(data)
        if (data.media_files?.length > 0) {
            const coverImage = data.media_files[0];
            if (coverImage instanceof File) {
                data["cover_image"] = coverImage;
                data.media_files = data.media_files.slice(1);
            }
        }

        const formData = new FormData();

        Object.keys(data).forEach(key => {
            const value = data[key];
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item instanceof File) {
                        formData.append(`${key}[]`, item);
                    } else if (typeof item === "object" && item !== null) {
                        formData.append(`${key}[]`, JSON.stringify(item));
                    } else {
                        formData.append(`${key}[]`, item);
                    }
                });
            }
            else if (value instanceof File) {
                formData.append(key, value);
            }
            else if (typeof value === "object" && value !== null) {
                formData.append(key, JSON.stringify(value));
            }
            else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        createProduct(formData);
    }, [])

    return (
        <div>
            <div>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="font-semibold">Add product</h1>
                </div>

                <div className="bg-white p-2">
                    <DataForm fields={formField} onSubmit={handleSubmit} values={defaultValues} />
                </div>
            </div>
        </div>
    )
}

export default Index;