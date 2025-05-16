import { Link } from "react-router-dom";
import { LogOut as LogOutIcon, ShoppingCart, UserRound } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "@components/ui/popover";
import { useAuth } from "@features/auth/hooks";

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



// import React, { useState } from "react";
// import { Command } from "cmdk";
// import { AlignJustify, Search, Check } from "lucide-react";
// import { cn } from "@utils";

// import { SidebarTrigger } from "../../components/ui/sidebar";
// import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";
// import { Button } from "@components/ui/button";

// import { PriceListDialog } from "@features/pos/components/price-list";
// import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";



// export const Header = () => {
//     const [isOpen, setIsOpen] = React.useState(true);

//     const frameworks = [
//         {
//             value: "next.js",
//             label: "Next.js",
//         },
//         {
//             value: "sveltekit",
//             label: "SvelteKit",
//         },
//         {
//             value: "nuxt.js",
//             label: "Nuxt.js",
//         },
//         {
//             value: "remix",
//             label: "Remix",
//         },
//         {
//             value: "astro",
//             label: "Astro",
//         },
//     ]
//     return (
//         <header className="flex items-center  justify-between px-6 py-2 ">
//             <div className="flex items-center gap-3">
//                 <SidebarTrigger>
//                     <div className="h-10 w-10 p-2 bg-gray-300 rounded-full cursor-pointer">
//                         <AlignJustify />
//                     </div>
//                 </SidebarTrigger>


//                 <SearchInput />

//                 <PriceListDialog>
//                     <Button>
//                         Price List
//                     </Button>
//                 </PriceListDialog>

//             </div>

//             <div>
//                 <div className="flex items-center gap-2">

//                     <button
//                         type="button"
//                         className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
//                         id="user-menu-button"
//                         aria-expanded="false"
//                         aria-haspopup="true"
//                     >
//                         <span className="absolute -inset-1.5"></span>
//                         <img
//                             className="size-10 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
//                             alt=""
//                         />
//                     </button>

//                     <div className="text-sm"> John Hammand</div>
//                 </div>
//             </div>
//         </header>
//     );
// }


// const SearchInput = () => {
//     const frameworks = [
//         { value: "react", label: "React" },
//         { value: "angular", label: "Angular" },
//         { value: "vue", label: "Vue" },
//         { value: "svelte", label: "Svelte" },
//         { value: "nextjs", label: "Next.js" },
//     ];

//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleSelect = (currentValue) => {
//         setValue(currentValue);
//         setOpen(false);

//         const selectedFramework = frameworks.find(
//             (framework) => framework.value === currentValue
//         );

//         if (selectedFramework) {
//             setSearchQuery(selectedFramework.label);
//         }
//     };

//     return (
//         <Popover open={open} onOpenChange={setOpen}>
//             <div>
//                 <div className="flex border items-center rounded-full py-2 px-4 w-96 focus-within:ring-1">
//                     <PopoverTrigger asChild>
//                         <input
//                             type="text"
//                             placeholder="Search Item"
//                             value={searchQuery}
//                             onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setOpen(true);
//                             }}
//                             className="w-100 outline-none bg-transparent flex-auto text-sm"
//                         />
//                     </PopoverTrigger>
//                     <div className="cursor-pointer">
//                         <Search />
//                     </div>
//                 </div>
//             </div>

//             <PopoverContent className="w-96 p-0">
//                 <Command>

//                     <Command.List>
//                         <Command.Group>
//                             {frameworks
//                                 .filter((framework) =>
//                                     framework.label.toLowerCase().includes(searchQuery.toLowerCase())
//                                 )
//                                 .map((framework) => (
//                                     <Command.Item
//                                         key={framework.value}
//                                         className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
//                                         value={framework.value}
//                                         onSelect={handleSelect}
//                                     >
//                                         {framework.label}
//                                         {value === framework.value && (
//                                             <Check className={cn("ml-auto", "opacity-100")} />
//                                         )}
//                                     </Command.Item>
//                                 ))}
//                             {frameworks.filter((framework) =>
//                                 framework.label.toLowerCase().includes(searchQuery.toLowerCase())
//                             ).length === 0 && (
//                                     <div className="py-6 text-center text-sm">No results found.</div>
//                                 )}
//                         </Command.Group>
//                     </Command.List>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     )
// }


