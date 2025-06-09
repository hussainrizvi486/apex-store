import { SidebarProvider, Sidebar } from "@components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import { Settings2, ReceiptText, PackageOpen, House, DotIcon, UserRound, BellDot } from "lucide-react";
import { cn, isActiveURL } from "@utils/index";
import { ItemText } from "@radix-ui/react-select";




export const AdminSidebarLayout = () => {
    const items = [
        { label: "Home", icon: <House />, url: "/admin/product/list" },
        { label: "Products", icon: <PackageOpen />, url: "" },
        { label: "Orders", icon: <ReceiptText />, url: "" },
        { label: "Customers", icon: <DotIcon />, url: "" },
        { label: "Discounts", icon: <DotIcon />, url: "" },
        { label: "Analytics", icon: <DotIcon />, url: "" },
        { label: "Settings", icon: <Settings2 />, url: "" }

    ]
    return (
        <div>
            <header className="bg-neutral-900 h-12 flex items-center justify-between px-4 text-white">
                <div className="font-semibold">Apex Store</div>

                <div>
                    <div className="bg-neutral-800 w-2xl rounded-md border border-neutral-700 focus-within:ring-2 ring-offset-1 ring-neutral-500 transition-all">
                        <input type="text " className=" outline-none w-full px-2 py-1 text-sm "  placeholder="Search"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <div className="cursor-pointer">
                            <UserRound className="size-5" />
                        </div>

                        <div className="cursor-pointer">
                            <BellDot className="size-5" />
                        </div>
                    </div>
                </div>

            </header>

            <SidebarProvider style={{ minHeight: "calc(100svh - 3rem)" }}>
                <Sidebar className="top-12">
                    <div className="py-4 px-2">
                        <ul className="flex w-full min-w-0 flex-col gap-1">
                            {items.map((item, index) => (
                                <Link to={item.url || ""} key={index}>
                                    <li >
                                        <div
                                            className={cn("flex items-center gap-2 w-full px-2 py-1 text-left rounded-md hover:bg-gray-100 transition-all", isActiveURL(item.url) ? "bg-gray-100" : "")}
                                        >
                                            <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                                                {item.icon}
                                            </div>
                                            <div className="text-xs font-medium">{item.label}</div>
                                        </div>
                                    </li>
                                </Link>))}

                        </ul>
                    </div>
                </Sidebar>
                <div className="flex-auto bg-[#f2f2f2]">
                    <div className="px-4">
                        <Outlet />
                    </div>
                </div>
            </SidebarProvider >
        </div>

    );
}