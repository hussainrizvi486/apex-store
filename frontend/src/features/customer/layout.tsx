import { Outlet, Link } from "react-router-dom";
import { Menu as MenuIcon, UserRound, X as CrossIcon, House as HouseIcon, LogOut as LogOutIcon, Folders, LogOut, MapPinHouse, SquarePen, Settings, CakeSlice, MessageSquareDiff } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@components/ui/sheet";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';


const SidebarContent = () => {
    return (
        <div className="py-4">
            <header className="">
                <SheetClose asChild>
                    <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        <CrossIcon className="size-6" />
                        <span className="sr-only">Close</span>
                    </div>
                </SheetClose>
            </header>

            <div >
                <div className="flex items-center gap-1 ">
                    <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" alt="" className="h-10 w-10 rounded-full" />
                    <div className="font-medium">John Doe</div>
                </div>

                <div className="mt-6">
                    <div >
                        <Link to="/profile" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            <HouseIcon className="size-5" />
                            <div>Home</div>
                        </Link>

                        <Link to="/profile/address" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            <MapPinHouse className="size-5" />
                            Address Book
                        </Link>

                        <Link to="/profile/orders" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            <Folders className="size-5" />
                            My Orders
                        </Link>

                        <Link to="/profile/reviews" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            <MessageSquareDiff className="size-5" />
                            My Reviews
                        </Link>

                        <Link to="/profile/wishlist" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            <CakeSlice className="size-5" />
                            <div>Wishlist</div>
                        </Link>
                        <Link to="/profile/settings" className="flex items-center gap-2 px-1 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium">

                            <Settings className="size-5" />
                            <div>Settings</div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-md absolute bottom-10 left-2 right-2">
                        <LogOutIcon className="size-5" />
                        <div className="text-sm font-medium">Logout</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export const Layout = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    }

    useEffect(() => {
        setOpen(false);
    }, [location.pathname])

    return (
        <div>
            <header className="h-12  flex justify-between items-center px-2 py-2  shadow-md ">
                <div className="flex items-center">
                    <div className="hover:bg-hover-bg p-1 rounded-full transition-colors mr-1">
                        <Sheet open={open} onOpenChange={handleOpenChange}>
                            <SheetTrigger className="cursor-pointer" asChild>
                                <MenuIcon className="size-6 cursor-pointer" />
                            </SheetTrigger>

                            <SheetContent side="left" className="p-2">
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link to="/"><h1 className="text-lg font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1></Link>
                </div>

                <div>
                    <Link to="/profile">
                        <UserRound className="size-5" />
                    </Link>
                </div>
            </header>
            <div className="min-h-[calc(100vh-3rem)] bg-accent px-2 py-4 md:max-w-6xl md:mx-auto md:bg-white">
                <Outlet />
            </div>
        </div>
    )
}