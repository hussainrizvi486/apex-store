import { useProductsList } from "@features/product/api";
import { ProductCard, ProductsGrid } from "../../components";
import { Header } from "@components/layouts";

const Index = () => {
    const { data } = useProductsList();

    return (
        <div>
            <Header />


            <div className="max-w-6xl mx-auto p-4">
                <div className="overflow-hidden rounded-md">
                    <img src="https://resource.logitech.com/w_1800,h_472,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/mx-mechanical-mini-for-mac-and-mx-anywhere-3s-create-your-own-combo-hpb-desktop-2.jpg" alt="" />
                </div>


                <div className="p-4 mb-6">
                    <div className="mb-4 font-bold text-lg">Our Products</div>
                    <ProductsGrid>
                        {data?.products?.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </ProductsGrid>
                </div>

                <div className="p-4">
                    <div className="mb-4 font-bold text-lg">New Arrivals</div>
                    <ProductsGrid>
                        {data?.products?.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </ProductsGrid>
                </div>
            </div>
        </div>

    )
}


export default Index


