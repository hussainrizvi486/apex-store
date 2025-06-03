import { API_URL } from "@api/index";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchFilters } from "./search-filter";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@components/ui/select";
import { Spinner } from "@components/loaders/spinner";
import { ProductCard } from "@features/product/components";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useSearchProducts = (params: Record<string, string | null>) => {
    return useQuery({
        queryKey: ["search-products", params],
        queryFn: async () => {
            let url = API_URL + "api/product/search";

            const { query } = params;
            if (query) {
                url += `?query=${encodeURIComponent(query)}`;
            }

            const response = await axios.get(url);
            return response.data;
        },
        enabled: !!params && Object.keys(params).length > 0,
    })
}

const Index = () => {
    const [params] = useSearchParams();
    const [query, setQuery] = useState(params.get("query"));

    useEffect(() => {
        setQuery(params.get("query") || "");
    }, [params])


    const { data, isLoading } = useSearchProducts({ "query": query });


    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex ">
                <SearchFilters />
                <div className="flex-auto p-4 ml-6">
                    <div className="flex justify-between items-center">
                        <div>Search Results</div>

                        <div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                                    <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <div className="mt-4">
                        {isLoading ? <Loading /> : !isLoading && !data?.products?.length ? <NoResults /> :
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {data?.products?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Loading = () => {
    return (
        <div className="flex items-center justify-center py-5">
            <Spinner size="lg" />
            <div className="ml-2">Loading...</div>
        </div>
    )
}

const NoResults = () => {

    return (
        <div className="text-center py-5 text-sm">
            <div className="text-gray-800 text-lg font-medium mb-2">No results found</div>
            <div className="text-gray-500">We're sorry. We cannot find any matches for your search term.</div>
        </div>
    )
}

export default Index;
