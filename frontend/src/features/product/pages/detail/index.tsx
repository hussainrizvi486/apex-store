import { API_URL } from "@api/index";
import { Button } from "@components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { cn, decimal, formatCurrency, integer } from "@utils/index";
import { Heart as HeartIcon, Star as RatingIcon, Share2 as Share2Icon } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductMedia } from "./product-media";
import toast from "react-hot-toast";


const useProductQuery = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(API_URL + "/api/product/" + id);
            return response.data;
        }
    })
}

const Index = () => {
    const params = useParams();
    const { id } = params;
    let { data: product, isLoading, isError } = useProductQuery(id as string);
    console.log(product)

    if (!product) {
        return <div>Loading...</div>;
    }
    // product["discount_price"] = 10

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast('Product link copied to clipboard!', {
            icon: '📋', position: "bottom-right"
        },);
    }

    const handleFavourite = () => {
        toast('Product added to favourites!', {
            icon: '❤️',
            position: "bottom-right"
        });
    }
    return (
        <div className="max-w-7xl mx-auto px-2">

            <div className="mb-8">
                <div className="shadow-md mb-4 border">
                    <ProductMedia images={[product?.cover_image, ...product.images]} />
                    {/* <img src={product?.cover_image} alt="" /> */}
                </div>

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{decimal(product.rating)}</span>
                            <div className="flex items-center gap-1">
                                {
                                    Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                                        <RatingIcon key={rating} className={cn("size-4", integer(product.rating) >= rating ? "fill-yellow-500 text-yellow-700 " : "text-gray-300")} />
                                    ))
                                }
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Share2Icon className="size-5 cursor-pointer" onClick={handleShare} />
                            <HeartIcon className="size-5" onClick={handleFavourite} />
                        </div>
                    </div>
                    <div className="font-medium">{product.product_name}</div>
                    <div className="mt-2">
                        <div className="font-medium">
                            {product.discount_price ?
                                <div>
                                    {formatCurrency(product.discount_price)} &nbsp;
                                    <span className="text-sm line-through text-gray-500">{formatCurrency(product.price, product.currency)}</span>
                                </div>
                                : formatCurrency(product.price, product.currency)}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 flex-col sm:flex-row">
                        <Button className="basis-full">Add to Cart</Button>
                        <Button className="basis-full" variant="secondary" onClick={() => alert('Buy Now clicked!')}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <div >
                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>
        </div>
    )
}



export default Index;