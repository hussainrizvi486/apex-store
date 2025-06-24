import { Button } from "@components/ui/button";
import { cn } from "@utils/index";
import { Star as RatingIcon } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";
interface ReviewType {
    order_id: string;
    comment: string;
    rating: number;
    order: string;
    images: Array<string>;
    created_at: string;
    modified_at: string;
}

const Index = () => {
    const data: ReviewType[] = [
        {
            order_id: "#0001",
            comment: "Great product!",
            rating: 5,
            order: "12345",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvuPHk3MkcW9P1r_8a6KBSIn611icSFHO10Q&s", "https://zellbury.com/cdn/shop/files/WWDS24001-6.jpg?v=1731937816&width=1445"],
            created_at: "2023-01-01T00:00:00Z",
            modified_at: "2023-01-02T00:00:00Z",
        },
        {
            order_id: "#000",
            comment: "Not what I expected.",
            rating: 2,
            order: "12346",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4XrcpfJC1omvBC_VXaGIIYA9U_1v0YU-Bw&s"],
            created_at: "2023-01-03T00:00:00Z",
            modified_at: "2023-01-04T00:00:00Z",
        }
    ]
    return (
        <div className="px-2 bg-accent">
            <div className="text-lg font-semibold">My Reviews</div>

            {
                data.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                ))
            }
            <div></div>
        </div>
    )
}


export const ReviewCard = ({ review }: { review: ReviewType }) => {
    return (
        <div>
            <div className="border p-4 rounded-md mb-4 bg-white">
                <div className="mb-4 flex items-center justify-between ">
                    <div className="text-sm font-semibold ">
                        <div>
                            ID: {review.order_id}
                        </div>

                        <div className="text-xs text-gray-500">{moment(review.created_at).format("MMMM Do YYYY")}</div>
                    </div>
                    <Link to={""}>
                        <Button size="sm">View Order</Button>
                    </Link>

                </div>

                <div className="flex items-center gap-1  mb-4">
                    {
                        Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                            <RatingIcon key={rating} className={cn("size-4", review.rating >= rating ? "fill-yellow-500 text-yellow-700 " : "text-gray-300")} />
                        ))
                    }
                </div>


                <p className="text-sm mb-2">{review.comment}</p>
                <div className="flex gap-2">
                    {review.images.map((img, index) => (
                        <img key={index} src={img} alt={`Review image ${index + 1}`} className="h-16 w-16 object-cover rounded-md cursor-pointer" />
                    ))}
                </div>
            </div>
        </div >
    )
}
export default Index;