export interface CategoryType {
    id: string
    name: string,
    image: string,
}


export interface ProductType {
    id: string
    product_name: string
    category: CategoryType
    price: number
    cover_image?: string
    product_type: string
}

export interface ProductDetailType extends ProductType {
    template?: string
    uom?: string
    created_at: string,
    updated_at: string,
}