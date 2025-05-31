import { Link, useNavigate } from "react-router-dom";
import { LogOut as LogOutIcon, Search as SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "@components/ui/popover";
import { useAuth } from "@features/auth/hooks";
import React, { useCallback, useEffect } from "react";
import { cn } from "@utils/index";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@api/index";
import axios from "axios";

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
                    <Link to="/">
                        <h1 className="text-2xl font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1>
                    </Link>
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


const useSuggestionsQuery = (query: string) => {
    return useQuery({
        queryKey: ["search-suggestions", query],
        queryFn: async () => {
            let url = API_URL + "/search/suggestions";
            if (query) {
                url += `?query=${encodeURIComponent(query)}`;
            }
            const response = await axios.get(url);
            return response.data;
        },
    })
}

const SearchBar = () => {
    const params = new URLSearchParams(window.location.search);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState(params.get("query") || "");
    const navigate = useNavigate();

    const handleBlur = () => {
        setTimeout(() => setOpen(false), 200);
    }

    const handleFocus = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleSearch = () => {
        navigate("/search")
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        if (query) {
            url.searchParams.set("query", query);
        } else {
            url.searchParams.delete("query");
        }
        window.history.replaceState({}, '', url.toString());
    }, [query])




    const { data: results, isLoading } = useSuggestionsQuery(query);

    // const results = [
    //     { query: "Gaming Mouse", },
    //     { query: "New Arrivals", },
    //     { query: "logitech keyboard and mouse gear", },
    //     { query: "Wireless Headphones", },
    //     { query: "MacBook Pro", },
    //     { query: "iPhone 15", },
    //     { query: "Gaming Chair", },
    //     { query: "4K Monitor", },
    //     { query: "Mechanical Keyboard", },
    //     { query: "Graphics Card", },
    //     { query: "Laptop Stand", },
    //     { query: "Bluetooth Speaker", },
    //     { query: "Smart Watch", },
    //     { query: "USB-C Cable", },
    //     { query: "External Hard Drive", },
    //     { query: "Webcam", },
    //     { query: "Tablet", },
    //     { query: "Wireless Mouse", },
    //     { query: "Desk Lamp", },
    //     { query: "Power Bank", },
    // ]

    return (
        <div >
            <div className="flex items-center border border-gray-300 rounded-full pl-3 pr-2 py-0.5 w-2xl focus-within:ring-2 focus-within:ring-primary transition-all duration-200 ring-offset-2">
                <input
                    type="text"
                    placeholder="Search for products, category, etc..."
                    className="w-full h-full outline-none text-sm"
                    onBlur={handleBlur}
                    value={query}
                    onChange={(event) => {
                        const { value } = event.target;
                        setQuery(value)
                        if (value) {
                            setOpen(true);
                        }

                    }}
                    onFocus={handleFocus}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}

                />
                <div className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                    onClick={handleSearch}>
                    <SearchIcon className="size-5" />
                </div>
            </div>

            <SearchBarResults
                open={open}
                isLoading={isLoading}
                results={results?.suggestions}
                setValue={(value) => setQuery(value)}
                close={handleClose}

            />
        </div>
    )
}

interface SearchBarResultsProps {
    open: boolean;
    isLoading: boolean;
    results?: { id: number; query: string }[];
    setValue?: (value: string) => void;
    close?: () => void;
}

const SearchBarResults: React.FC<SearchBarResultsProps> = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleClick = (value: string) => {
        props.setValue?.(value);
        props.close?.();
    }

    const handleSelection = useCallback(() => {
        if (selectedIndex >= 0 && props.results?.[selectedIndex]) {
            const selectedResult = props.results[selectedIndex];
            props.setValue?.(selectedResult.query);
            props.close?.();
        }
    }, [selectedIndex, props]);


    const handleKeyDown = useCallback((e: KeyboardEvent) => {

        if (!props.open || !props.results?.length) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < props.results!.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case "Enter":
                e.preventDefault();
                handleSelection();
                props.close?.();
                break;
            case "Escape":
                e.preventDefault();
                setSelectedIndex(-1);
                break;
        }

    }, [props, handleSelection])


    useEffect(() => {
        if (!props.open) {
            setSelectedIndex(-1);
        }
    }, [props.open, props.results]);


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [props.open, handleKeyDown])


    return (
        <>
            {props.open ? (
                <div className="max-h-96 overflow-y-auto absolute z-10 bg-white w-2xl shadow-md mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {props?.results?.map((result, index) => (
                        <div key={index} onClick={() => handleClick(result.query)}
                        >
                            <div className={cn("px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-sm flex gap-2 items-center ",
                                index === selectedIndex
                                    ? 'bg-slate-200 '
                                    : 'hover:bg-gray-100'

                            )}>
                                <div className="shrink-0 p-1 rounded-full">
                                    <SearchIcon className="size-4" />
                                </div>
                                <div className="flex-auto whitespace-nowrap overflow-hidden text-ellipsis">
                                    {result.query}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            ) : null}
        </>
    )
}