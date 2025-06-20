import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@components/ui/select";
import { authAPI } from "@features/auth/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FilePenLine, KeyRound, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface TypeUser {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    dob: string;
    gender?: string;
}

const useUserQuery = () => {
    return useQuery<TypeUser>({
        queryKey: ["user-detail"],
        queryFn: async () => {
            const response = await authAPI.get("/auth/api/v1/user");
            return response.data;
        },
    });
};

const Index = () => {
    const { data, isLoading, isError } = useUserQuery();
    const [form, setForm] = useState<TypeUser>({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
    });

    useEffect(() => {
        if (data) {
            setForm({ ...data });
        }
    }, [data]);

    const handleChange = (key: keyof TypeUser, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-4 text-red-500">Failed to load user data.</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-2">
                <Link to="/profile">
                    <ArrowLeft className="size-6" />
                </Link>
                <div className="text-lg font-semibold">Edit Profile</div>
            </div>

            <div className="flex justify-center py-4">
                <div className="relative w-fit">
                    <div className="h-20 w-20 rounded-full relative overflow-hidden">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                            alt="Profile"
                            className="rounded-full h-full w-full object-contain"
                        />
                    </div>

                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200 transition-colors">
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                        <FilePenLine className="size-4" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                {[
                    { label: "First Name", key: "first_name" },
                    { label: "Last Name", key: "last_name" },
                    { label: "Phone Number", key: "phone" }
                ].map(({ label, key }) => (
                    <div key={key} className="mb-4">
                        <div className="text-sm mb-1 font-medium">{label}</div>
                        <Input
                            value={form[key as keyof TypeUser] || "n"}
                            onChange={(e) => handleChange(key as keyof TypeUser, e.target.value)}
                        />
                    </div>
                ))}

                <div className="mb-4">
                    <div className="text-sm mb-1 font-medium">Gender</div>
                    <Select
                        value={form.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem className="text-sm" value="male">Male</SelectItem>
                                <SelectItem className="text-sm" value="female">Female</SelectItem>
                                <SelectItem className="text-sm" value="other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-4">
                    <div className="text-sm mb-1 font-medium">Date of Birth</div>
                    <Input
                        type="date"
                        value={form.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                    />
                </div>

                <div>
                    <Button className="w-full">Update</Button>
                </div>
            </div>

            <div>
                <Link to="/profile/change-password">
                    <div className="flex items-center gap-2 text-sm py-2 px-1 bg-white border-b cursor-pointer hover:bg-accent transition-colors">
                        <KeyRound className="size-5" />
                        <div>Change Password</div>
                    </div>
                </Link>
                <div className="flex items-center gap-2 text-sm py-2 px-1 bg-white border-b cursor-pointer hover:bg-accent transition-colors">
                    <Mail className="size-5" />
                    <div>Change Email</div>
                </div>
            </div>
        </div>
    );
};

export default Index;
