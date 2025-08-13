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

    //     {
    //     "id": "10f97572-823b-49a8-932e-aed5b9f24135",
    //     "dob": null,
    //     "image": null,
    //     "email": "admin@gmail.com",
    //     "first_name": "",
    //     "last_name": "",
    //     "username": "",
    //     "mobile": null,
    //     "verified": false
    // }
    return (
        <>
            <div className="flex justify-center py-2 border-b mb-4 md:justify-start md:gap-4">

                <div className="flex flex-col items-center">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" alt="" className="h-20 w-20 rounded-full" />
                        <div className="text-sm text-center mt-2 font-medium">
                            {user.fullName}
                        </div>
                    </div>
                    <Link to="/profile/edit" className="mt-2 flex items-center gap-2 text-sm text-secondary-foreground ">
                        <SquarePen className="size-4" /> Edit Profile
                    </Link>
                </div>
                <div className="py-4 hidden md:block">
                    <div className="text-lg font-semibold">Hi Welcome, {user.fullName}</div>
                </div>

            </div>

            <div >
                <div className="mb-2 font-semibold">Quick Access</div>
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
        </>
    )
}

export default Index;