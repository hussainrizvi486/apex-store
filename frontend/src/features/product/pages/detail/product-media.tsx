import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";


export const ProductMedia: React.FC<{ images: string[] }> = ({ images }) => {

    return (
        <div>
            <Carousel className="w-full">
                <CarouselContent className="h-[400px]">
                    {
                        images.map((slide, index) => (
                            <CarouselItem key={index} className="h-full">
                                <img src={slide} alt="" className="h-full w-full object-cover" />
                            </CarouselItem >
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}