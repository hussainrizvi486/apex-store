import { useProductsList } from "@features/product/api";
import { ProductCard, ProductsGrid } from "../../components";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";


const slides = [
    "https://resource.logitech.com/w_1800,h_472,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/software/software-page/customization-and-control-made-easy-blue-desktop.png",
    "https://resource.logitech.com/w_1800,h_472,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/planet-and-people/everything-matters/logi-sustainability-everything-matters-hero-desktop.jpg",
    "https://resource.logitech.com/w_1800,h_472,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/planet-and-people/everything-matters/logi-sustainability-everything-matters-more-to-story-desktop.jpg"

]
const Index = () => {
    const { data } = useProductsList();

    return (
        <div>
            <div className="max-w-6xl mx-auto p-4">
                <Carousel className="w-full">
                    <CarouselContent className="h-[300px] ">
                        {
                            slides.map((slide, index) => (
                                <CarouselItem key={index} className="h-full">
                                    <img src={slide} alt="" className="h-full w-full object-cover" />
                                </CarouselItem >
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="overflow-hidden rounded-md">

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


