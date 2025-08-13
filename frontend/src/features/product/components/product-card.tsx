import { Heart as HeartIcon, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductType } from "../index";

const NO_IMAGE = "https://cdn-icons-png.flaticon.com/512/15484/15484675.png";

interface ProductCardProps {
    product: ProductType;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link to={"/product/" + product.id}>
            <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden flex flex-col hover:bg-gray-100 transition-all cursor-pointer pt-2">
                <div className="relative">
                    <img
                        src={product.cover_image || NO_IMAGE}
                        alt={product.product_name}
                        className="w-full h-48 object-contain p-2"
                    />
                    {/* {product.badge && (
                    <div className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-1 ${product.badge === 'Best Seller' ? 'bg-blue-100 text-blue-700' :
                        product.badge === 'Special Offer' ? 'bg-green-100 text-green-700' :
                            product.badge === 'Low Inventory' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-200 text-gray-700'
                        }`}>
                        {product.badge}
                    </div>
                )} */}
                    <button className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700">
                        <HeartIcon size={16} className="hover:scale-105" />
                    </button>
                </div>
                <div className="p-2 flex flex-col justify-between flex-grow">
                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb">
                            {product.product_name}
                        </p>
                    </div>

                    <div className="text-sm font-semibold text-gray-900 mb-2">
                        {product.price}
                    </div>

                    <div>
                        <Link
                            to="/cart"
                            className="text-xs text-gray-700 hover:text-gray-900 flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-colors w-fit"
                        >
                            Add to cart
                            <ShoppingCartIcon size={16} />
                        </Link>
                    </div>
                </div>
            </div>

        </Link>
    );
};
