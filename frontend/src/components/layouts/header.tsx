import { Link } from "react-router-dom";
import { LogOut as LogOutIcon, Search as SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "@components/ui/popover";
import { useAuth } from "@features/auth/hooks";
import React from "react";

const ProfileDropdown = () => {
    return (
        <nav>
            <Link to="/profile">
                <div className="text-sm px-2 mb-1 font-medium hover:underline hover:underline-offset-1 cursor-pointer">
                    Profile
                </div>
            </Link>
            <Link to="/cart">
                <div className="text-sm px-2 mb-1 font-medium hover:underline hover:underline-offset-1 cursor-pointer">
                    My Cart
                </div>
            </Link>
            <Link to="/orders">
                <div className="text-sm px-2 mb-1 font-medium hover:underline hover:underline-offset-1 cursor-pointer">
                    Orders
                </div>
            </Link>
            <Link to="/settings">
                <div className="text-sm px-2 mb-1 font-medium hover:underline hover:underline-offset-1 cursor-pointer">
                    Account Settings
                </div>
            </Link>
        </nav>
    )
}

const navLinks = [
    { label: "Shop", url: "/" },
    { label: "Deals", url: "/" },
    { label: "Categories", url: "/" },
]

export const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header className="border-b border-gray-200">
            <div className="flex justify-between items-center px-20 py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1>
                    <nav className="flex gap-6 ml-8 mt-1">
                        {navLinks.map(v => (
                            <Link className="text-sm font-medium font-poppins" to={v.url}>{v.label}</Link>
                        ))}
                    </nav>
                </div>

                <SearchBar />
                <div>
                    <nav className="flex gap-4">
                        {
                            isAuthenticated ?
                                <>
                                    <Link to="/cart">
                                        <ShoppingCart className="size-5" />
                                    </Link>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="hover:cursor-pointer outline-none">
                                                <UserRound className="size-5" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="p-2">
                                            <div className="mb-2">
                                                <div className="px-2 text-lg font-semibold">Hi Hussain</div>
                                                <div className="mt-2">
                                                    <ProfileDropdown />
                                                </div>
                                            </div>
                                            <button className="text-sm flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 w-full p-2 transition-colors font-semibold outline-none"><LogOutIcon className="size-4 " /> Logout</button>
                                        </PopoverContent>
                                    </Popover>
                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <ShoppingCart className="size-5" />
                                    </Link>
                                    <Link to="/login">
                                        <UserRound className="size-5" />
                                    </Link>
                                </>}
                    </nav>
                </div>
            </div>
        </header >
    );
};


const SearchBar = () => {
    const [open, setOpen] = React.useState(false); // Changed to false initially

    const handleBlur = () => {
        setTimeout(() => setOpen(false), 100);
    }

    const handleFocus = () => {
        setOpen(true)
    }

    const results = [
        { id: 1, query: "Gaming Mouse", },
        { id: 2, query: "New Arrivals", },
        { id: 3, query: "logitech keyboard and mouse gear", },
        { id: 4, query: "Wireless Headphones", },
        { id: 5, query: "MacBook Pro", },
        { id: 6, query: "iPhone 15", },
        { id: 7, query: "Gaming Chair", },
        { id: 8, query: "4K Monitor", },
        { id: 9, query: "Mechanical Keyboard", },
        { id: 10, query: "Graphics Card", },
        { id: 11, query: "Laptop Stand", },
        { id: 12, query: "Bluetooth Speaker", },
        { id: 13, query: "Smart Watch", },
        { id: 14, query: "USB-C Cable", },
        { id: 15, query: "External Hard Drive", },
        { id: 16, query: "Webcam", },
        { id: 17, query: "Tablet", },
        { id: 18, query: "Wireless Mouse", },
        { id: 19, query: "Desk Lamp", },
        { id: 20, query: "Power Bank", },
    ]

    return (
        <div >
            <div className="flex items-center border border-gray-300 rounded-full pl-3 pr-2 py-2 w-2xl focus-within:ring-2 focus-within:ring-primary transition-all duration-200 ring-offset-2">
                <input
                    type="text"
                    placeholder="Search for products, category, etc..."
                    className="w-full h-full outline-none text-sm"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                <SearchIcon className="size-5" />
            </div>

            <SearchBarResults open={open} results={results} />
        </div>
    )
}
const SearchBarResults = (props) => {
    return (
        <>
            {props.open ? (
                <div className="max-h-96 overflow-y-auto absolute z-10 bg-white w-2xl shadow-md mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {props?.results.map((result) => (
                        <Link to={`/search/${result.query}`} key={result.id}>
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-sm">
                                {result.query}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </>
    )
}