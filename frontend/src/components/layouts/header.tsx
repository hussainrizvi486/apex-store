import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut as LogOutIcon, Menu, Search as SearchIcon, ShoppingCart, UserRound } from "lucide-react";

import { PopoverContent, Popover, PopoverTrigger } from "@components/ui/popover";
import { useAuth } from "@features/auth/hooks";
import { cn } from "@utils/index";
import { API_URL } from "@api/index";



interface SearchBarResultsProps {
    open: boolean;
    isLoading: boolean;
    results?: { id: number; query: string }[];
    handleSearch: (value: string) => void;
    close: () => void;
}


const ProfileDropdown = ({ className = "" }) => {
    const handleLogout = () => { };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className={cn("hover:cursor-pointer outline-none", className)}>
                    <UserRound className="size-5" />
                </button>
            </PopoverTrigger>

            <PopoverContent className="p-2">
                <div className="mb-2">
                    <div className="px-2 text-lg font-semibold">Hi Hussain</div>
                    <div className="mt-2">
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
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 w-full p-2 transition-colors font-semibold outline-none"
                >
                    <LogOutIcon className="size-4" /> Logout
                </button>
            </PopoverContent>
        </Popover>
    )
}


export const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="max-w-6xl mx-auto">

            <header className="border-b border-gray-200">
                <div className="grid grid-cols-2 p-2 md:grid-cols-4 md:py-3">
                    <div className="flex items-center">
                        <div className="cursor-pointer hover:bg-hover-bg p-1 rounded-full transition-colors mr-1 md:hidden ">
                            <Menu className="size-6" />
                        </div>
                        <Link to="/">
                            <h1 className="text-2xl font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1>
                        </Link>
                    </div>

                    <SearchBar />

                    <div className="flex items-center justify-end">
                        <nav className="flex items-center gap-2">
                            {
                                isAuthenticated ?
                                    <>
                                        <Link to="/cart">
                                            <ShoppingCart className="size-5" />
                                        </Link>

                                        <Link to="/profile" className="sm:hidden"><UserRound className="size-5" /></Link>
                                        <ProfileDropdown className="hidden sm:block" />
                                    </>
                                    :
                                    <>
                                        <Link to="/login">
                                            <ShoppingCart className="size-5" />
                                        </Link>
                                        <Link to="/login">
                                            <UserRound className="size-5" />
                                        </Link>
                                    </>
                            }
                        </nav>
                    </div>
                </div>
            </header>
        </div>
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
        enabled: !!query,
    })
}

const SearchBar = () => {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState(params.get("query") || "");

    const handleBlur = () => {
        setTimeout(() => setOpen(false), 150);
    }

    const handleFocus = () => {
        if (query) {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSearch = (value?: string) => {
        const finalQuery = value || query;
        if (finalQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(finalQuery.trim())}`);
            setOpen(false);
        }
    }

    const { data: results, isLoading } = useSuggestionsQuery(query);

    return (
        <div className="relative row-start-2 col-span-2 mt-2 md:mt-0 md:row-start-1 md:col-start-2 md:col-span-2">

            <div className="flex items-center border border-gray-300 rounded-md pl-3 pr-2  focus-within:ring-2 focus-within:ring-primary transition-all duration-200 ring-offset-2 ">
                <input
                    type="text"
                    placeholder="Search for products, category, etc..."
                    className="w-full h-full outline-none text-sm"
                    onBlur={handleBlur}
                    value={query}
                    onChange={(event) => {
                        const { value } = event.target;
                        setQuery(value);
                        if (value) {
                            setOpen(true);
                        } else {
                            setOpen(false);
                        }
                    }}
                    onFocus={handleFocus}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />
                <div
                    className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                    onClick={() => handleSearch(query)}
                >
                    <SearchIcon className="size-5" />
                </div>
            </div>

            <SearchBarResults
                open={open}
                isLoading={isLoading}
                results={results?.suggestions}
                handleSearch={handleSearch}
                close={handleClose}
            />
        </div>
    )
}


const SearchBarResults: React.FC<SearchBarResultsProps> = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleClick = (value: string) => {
        props.handleSearch(value);
        props.close();
    }

    const handleSelection = useCallback(() => {
        if (selectedIndex >= 0 && props.results?.[selectedIndex]) {
            const selectedResult = props.results[selectedIndex];
            props.handleSearch?.(selectedResult.query);
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
                break;
            case "Escape":
                e.preventDefault();
                setSelectedIndex(-1);
                props.close?.();
                break;
        }
    }, [props, handleSelection])

    useEffect(() => {
        if (!props.open) {
            setSelectedIndex(-1);
        }
    }, [props.open]);

    useEffect(() => {
        if (props.open) {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            }
        }
    }, [props.open, handleKeyDown]);

    if (!props.open) return null;

    return (
        <div className="absolute top-full left-0 right-0 max-h-96 overflow-y-auto z-50 bg-white shadow-lg border border-gray-200 rounded-md mt-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {props.isLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : props.results && props.results.length > 0 ? (
                props.results.map((result, index) => (
                    <div
                        key={result.id}
                        onClick={() => handleClick(result.query)}
                        className={cn(
                            "px-4 py-2 cursor-pointer transition-colors text-sm flex gap-2 items-center",
                            index === selectedIndex
                                ? 'bg-slate-200'
                                : 'hover:bg-gray-100'
                        )}
                    >
                        <div className="shrink-0 p-1 rounded-full">
                            <SearchIcon className="size-4" />
                        </div>
                        <div className="flex-auto whitespace-nowrap overflow-hidden text-ellipsis">
                            {result.query}
                        </div>
                    </div>
                ))
            ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No suggestions found</div>
            )}
        </div>
    );
}