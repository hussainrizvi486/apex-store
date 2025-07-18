import { DataForm, DataFormProvider, DataFormTrigger } from "@components/data-form/main";
import { CustomFieldProps, FormValues, TypeField, TypeOption } from "@components/data-form/types";
import { authAPI } from "@features/auth/api";
import { Button } from "@components/ui/button";
import React, { useCallback, useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import { fieldsObject } from "@components/data-form/test";


interface FileTypes {
    file?: File;
    url?: string;
    id: string;
    name?: string
}
const ProductMedia: React.FC<CustomFieldProps> = ({ form }) => {

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
            form.setValue?.("media_files", files);
        }
    }

    const removeFile = (index: number) => {
        if (data?.length) {
            const updated = data.filter((_, idx) => idx !== index);
            setData(updated.length > 0 ? updated : null);
            form.setValue?.("media_files", updated);
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
                                    <X className="size-4" />
                                </button>

                                <img src={URL.createObjectURL(file.file)} alt={`Uploaded file ${i}`} className="h-full w-full object-contain" />
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



export const formField: Array<TypeField> = [
    {
        type: "section",
        label: "",
        sectionBreak: true,

        name: "product_details_section",
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
        getOptions: async () => {
            const request = await authAPI.get("api/get/categories/list");
            return request.data.map(v => ({ label: v.name, value: v.id, meta: v }));
        },

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
        type: "section",

    },

    {
        label: "Images",
        name: "media_files",
        type: "custom",
        component: () => <ProductMedia />,
    },
    {
        label: "Pricing",
        sectionBreak: true,
        name: "pricing_section",
        type: "section",
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

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>Product not found</div>;
    }
    const values = {
        product_type: product.product_type,
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
                    <DataFormProvider fields={formField} values={values} >

                        <DataForm onSubmit={handleSubmit} />
                        <DataFormTrigger>
                            <Button>Save</Button>
                        </DataFormTrigger>
                    </DataFormProvider>
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
                    {/* <DataForm fields={formField} onSubmit={handleSubmit} values={defaultValues} /> */}
                </div>
            </div>
        </div>
    )
}

export default Index;