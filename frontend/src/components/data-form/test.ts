export const fields = [
    {
        label: "Product Type",
        name: "product_type",
        type: "select",
        options: [
            { label: "Template", value: "template" },
            { label: "Variant", value: "variant" },
            { label: "Product", value: "product" }
        ],
    },
    {
        label: "Product Name",
        name: "product_name",
        type: "text",
        placeholder: "Enter product name",
        required: true,
    },
    {
        label: "Description",
        name: "description",
        type: "textarea",
        required: true,
    },
    {
        label: "Category",
        name: "category",
        type: "autocomplete",
        options: [
            {label: "Category 1", value: "category_1"},
            {label: "Category 2", value: "category_2"},
            {label: "Category 3", value: "category_3"},
            {label: "Category 4", value: "category_4"},
        ]
        // getOptions: async (value) => { }
    },
    {
        label: "UOM",
        name: "uom",
        type: "autocomplete",
        getOptions: async (value) => { }
    },
    {
        label: "Disabled",
        name: "disabled",
        type: "checkbox",
    },
    {
        label: "Maintain Stock",
        name: "maintain_stock",
        type: "checkbox",
    }
]