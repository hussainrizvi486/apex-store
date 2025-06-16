import { Folders, LogOut, MapPinHouse, SquarePen } from "lucide-react";
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


            <div >
                <div className="mb-4 font-semibold">Quick Access</div>
                <Link to="/profile/address" className="text-sm flex items-center gap-2  hover:bg-accent transition-colors px-1 py-2 rounded-md font-medium  ">
                    <MapPinHouse />
                    My Addresses
                </Link>

                <Link to="/profile/orders" className="text-sm flex items-center gap-2  hover:bg-accent transition-colors px-1 py-2 rounded-md font-medium">
                    <Folders />
                    My Orders
                </Link>

                <Link to="/profile/orders" className="text-sm flex items-center gap-2  hover:bg-accent transition-colors px-1 py-2 rounded-md font-medium">
                    <Folders />
                    My Reviews
                </Link>
                <Link to="/profile/orders" className="text-sm flex items-center gap-2  hover:bg-accent transition-colors px-1 py-2 rounded-md font-medium">
                    <Folders />
                    Wishlist
                </Link>
                <Link to="/profile/orders" className="text-sm flex items-center gap-2  hover:bg-accent transition-colors px-1 py-2 rounded-md font-medium">
                    <LogOut />
                    Logout
                </Link>
            </div>

            <div className="mt-4">

            </div>
        </div>
    )
}

export default Index;