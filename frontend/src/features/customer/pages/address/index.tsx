import { useQuery } from "@tanstack/react-query";
import { authAPI } from "@features/auth/api";
import { Button } from "@components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const useAddressQuery = () => {
    return useQuery({
        queryKey: ["address-list"],
        queryFn: async () => {
            const { data } = await authAPI.get("/auth/api/user/address/list");
            return data;
        },

        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000 // optional: keep unused data for 10 minutes
    })
}


// export const useAddressMutation = () => {
//     return useMutation({
//         mutationFn: async (body) => {
//             const { data } = await authAPI.post("/auth/api/user/address/create", body);
//             return data;
//         },
//         onError: (error) => {
//             console.error("Error creating address:", error);
//         },
//         onSuccess: () => {
//             console.log("Address created successfully!");
//         }
//     });
// }

const Index = () => {
    const { data, isLoading, isError } = useAddressQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading addresses.</div>;
    }

    return (
        <div className="px-2 py-w bg-accent">
            <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">My Address</div>
                <Link to="/profile/address/create">
                    <Button size="sm">Add Address</Button>
                </Link>
            </div>

            <div className="py-4">
                {data?.map((address, index) => (
                    <AddressCard address={address} key={index} />
                ))}
            </div>
        </div>
    );
}


const AddressCard = ({ address }) => {
    let DefaultTag = <></>

    if (address.default) {
        DefaultTag = <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>;
    }

    return (
        <div>
            <div className="p-2 bg-white rounded-md shadow-sm border mb-4 ">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold">{address.title}</div>
                        <div>
                            {DefaultTag}
                        </div>
                    </div>

                    <div className="text-sm mb-4" >
                        <p>{address.address_line_1}</p>
                        {address.address_line_2 && <p>{address.address_line_2}</p>}
                        <p>{address.city}, {address.state}, {address.country} - {address.postal_code}</p>
                        <p>Email: {address.email}</p>
                        <p>Phone: {address.phone_number}</p>
                    </div>


                    <div className="flex gap-2">
                        <Link to={`/profile/address/edit/${address.id}`}>
                            <Button size="sm"> <FilePenLine /><span>Edit</span></Button>
                        </Link>
                        <Button size="sm" variant="destructive" ><Trash2 /><span>Remove</span></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index;