import { Button } from "@components/ui/button";
import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        dob: '1990-01-01',
        fullName: 'John Doe'
    }
    return (
        <div className="px-2">

            <div className="flex justify-center py-4">
                <div className="flex flex-col items-center">

                    <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" alt="" className="h-20 w-20 rounded-full" />

                    <div className="text-sm text-center mt-2 font-medium">
                        {user.fullName}
                    </div>

                    <Link to="/profile/edit" className="mt-2 flex items-center gap-2 text-sm text-secondary-foreground ">
                        <SquarePen className="size-4" /> Edit Profile
                    </Link>
                </div>


            </div>


            <div className="flex justify-end py-2">
            </div>

            <div>
                <div className="text-sm mb-4">
                    <div className="font-medium mb-1">First Name</div>
                    <div className="bg-gray-100 p-2 rounded-md">{user.firstName}</div>
                </div>

                <div className="text-sm mb-4">
                    <div className="font-medium mb-1">Last Name</div>
                    <div className="bg-gray-100 p-2 rounded-md">{user.lastName}</div>
                </div>
                <div className="text-sm mb-4">
                    <div className="font-medium mb-1">Email</div>
                    <div className="bg-gray-100 p-2 rounded-md">{user.email}</div>
                </div>

                <div className="text-sm mb-4">
                    <div className="font-medium mb-1">Phone</div>
                    <div className="bg-gray-100 p-2 rounded-md">{user.phone}</div>
                </div>
                <div className="text-sm mb-4">
                    <div className="font-medium mb-1">Date of Birth</div>
                    <div className="bg-gray-100 p-2 rounded-md">{user.dob}</div>
                </div>
            </div>

            <div className="mt-4">
                <div>
                    <Link to="/profile/address" className="text-sm text-blue-500 hover:underline">
                        My Addresses
                    </Link>
                </div>

                <div>
                    <Link to="/profile/orders" className="text-sm text-blue-500 hover:underline">
                        My Orders
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Index;