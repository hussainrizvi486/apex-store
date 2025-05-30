import { API_URL } from "@api/index";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchFilters } from "./search-filter";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@components/ui/select";

const useSearchProducts = (params: Record<string, string>) => {
    return useQuery({
        queryKey: ["search-products", params],
        queryFn: async () => {
            if (!params || Object.keys(params).length === 0) {
                return null;
            }
            const queryString = new URLSearchParams(params).toString();
            const response = await axios.get(`${API_URL}api/product/search?${queryString}`);
            return response.data;
        },
        enabled: !!params && Object.keys(params).length > 0,
    })
}

const Index = () => {
    const api = useSearchProducts({ "query": "a" });

    console.log(api)
    return (
        <div className="max-w-7xl mx-auto">
            <SearchFilters />
            <div>
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
            </div>
        </div>
    )
}

export default Index;
