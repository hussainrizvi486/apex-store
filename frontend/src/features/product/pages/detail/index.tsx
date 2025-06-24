import { API_URL } from "@api/index";
import { Button } from "@components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { cn, decimal, formatCurrency, integer } from "@utils/index";
import { Heart as HeartIcon, Star as RatingIcon, Share2 as Share2Icon } from "lucide-react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ProductMedia } from "./product-media";
import toast from "react-hot-toast";
import moment from "moment";
import { useAddCartMutation } from "@features/cart/api";


const useProductQuery = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(API_URL + "/api/product/" + id);
            return response.data;
        }
    })
}


const reviews = [
    {
        customer: {
            customer_name: "John Doe",
            image: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
        },
        order_id: "#0001",
        comment: "Great product!",
        rating: 5,
        order: "12345",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvuPHk3MkcW9P1r_8a6KBSIn611icSFHO10Q&s", "https://zellbury.com/cdn/shop/files/WWDS24001-6.jpg?v=1731937816&width=1445"],
        created_at: "2023-01-01T00:00:00Z",
        modified_at: "2023-01-02T00:00:00Z",
    },
    {
        customer: {
            customer_name: "Molly",
            image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        order_id: "#000",
        comment: "Not what I expected.",
        rating: 2,
        order: "12346",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4XrcpfJC1omvBC_VXaGIIYA9U_1v0YU-Bw&s"],
        created_at: "2023-01-03T00:00:00Z",
        modified_at: "2023-01-04T00:00:00Z",
    }
]
const Index = () => {
    const params = useParams();
    const { id } = params;
    let { data: product, isLoading, isError } = useProductQuery(id as string);
    const addToCart = useAddCartMutation()
    console.log(product)

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast('Product link copied to clipboard!', {
            icon: '📋',
            position: "bottom-right",
            className: "text-sm",
        },);
    }

    const handleFavourite = () => {
        toast('Product added to favourites!', {
            icon: '❤️',
            className: "text-sm",
            position: "bottom-right"
        });
    }

    const handleAddToCart = () => {
        addToCart.mutate({
            product_id: product.id,
            quantity: 1,
            price: product.price
        })
        // product_id

        // quantity
        // price
    }

    product["discount_price"] = 10;

    return (
        <div className="max-w-7xl mx-auto px-2">
            <div>
                <div className="shadow-md mb-4 border">
                    <ProductMedia images={[product?.cover_image, ...product.images]} />
                    {/* <img src={product?.cover_image} alt="" /> */}
                </div>

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{decimal(product.rating)}</span>
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
                        <Button className="basis-full" onClick={handleAddToCart}>Add to Cart</Button>
                        <Button className="basis-full" variant="secondary" onClick={() => alert('Buy Now clicked!')}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <div className="mb-4 font-semibold">Product Description</div>
                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>

            <div className="mt-16 pb-8 bg-accent py-4">
                <div className="mb-4 font-semibold">Customer Reviews</div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {
                            Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                                <RatingIcon key={rating} className={cn("size-4", integer(product.rating) >= rating ? "fill-yellow-500 text-yellow-700 " : "text-gray-300")} />
                            ))
                        }
                    </div>
                    <span>{decimal(product.rating)} Out of 5  </span>
                </div>

                <div className="mt-4">
                    {
                        reviews.map((review) => (
                            <ReviewCard review={review} key={review.order_id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}



const ReviewCard = ({ review }) => {
    return (
        <div>
            <div className="border p-4 rounded-md mb-4 bg-white">
                <div className="mb-2 flex items-center justify-between ">
                    <div className="flex items-center gap-2">
                        <img src={review.customer.image} alt={review.customer.customer_name} className="h-10 w-10 rounded-full" />
                        <div className="text-sm font-semibold ">{review.customer.customer_name}</div>
                    </div>

                </div>
                <div className="mb-4">
                    <div className="flex items-center gap-1 mb-1">
                        {
                            Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                                <RatingIcon key={rating} className={cn("size-4", review.rating >= rating ? "fill-yellow-500 text-yellow-700 " : "text-gray-300")} />
                            ))
                        }
                    </div>
                    <div className="text-xs text-gray-500">{moment(review.created_at).format("MMMM Do YYYY")}</div>

                </div>

                <p className="text-sm mb-2">{review.comment}</p>
                <div className="flex gap-2">
                    {review.images.map((img, index) => (
                        <img key={index} src={img} alt={`Review image ${index + 1}`} className="h-16 w-16 object-cover rounded-md cursor-pointer" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index;