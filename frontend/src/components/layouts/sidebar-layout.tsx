import { Link, Outlet } from "react-router-dom";
import { Settings2, ReceiptText, PackageOpen, House, DotIcon } from "lucide-react";
import { SidebarProvider, Sidebar, } from "@components/ui/sidebar";
import { Header } from "./header";

const SIDEBAR_ITEMS = [
    {
        label: "Orders",
        icon: <House />,
    },
    {
        label: "Invoices",
        icon: <ReceiptText />,
        url: "/invoice",
    },
    {
        label: "Products",
        icon: <PackageOpen />,
    },
    {
        label: "Settings",
        icon: <Settings2 />,
        handleClick: function () { }
    },

];


export const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <Sidebar variant="sidebar">
                <div className="py-4 px-2">
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4464/4464973.png"
                            alt=""
                            className="h-8 w-8"
                        />
                        <div className="font-medium">Point of Sale</div>
                    </div>
                    <div>
                        <ul className="flex w-full min-w-0 flex-col gap-1">

                            {SIDEBAR_ITEMS.map((val, i) => (
                                <Link to={val.url || "/"} key={i}>
                                    <li key={i}>
                                        <button
                                            className="flex items-center gap-2 text-sm w-full p-2 text-left rounded-md hover:bg-gray-100 transition-all"
                                        >
                                            <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                                                {val.icon || <DotIcon />}
                                            </div>
                                            {val.label}
                                        </button>
                                    </li>
                                </Link>

                            ))}
                        </ul>
                    </div>
                </div>
            </Sidebar>

            <div className="flex-auto px-2">
                <Outlet />
            </div>

        </SidebarProvider>
    );
};