import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const useProductQuery = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get("/api/product/" + id);

        }
    })
}
const Index = () => {
    const params = useParams();
    const { id } = params;

    return (
        <div className="max-w-7xl mx-auto">
            {id}
        </div>
    )
}

export default Index;