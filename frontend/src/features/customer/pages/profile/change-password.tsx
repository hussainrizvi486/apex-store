import { Input } from "@components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@features/auth/api";

const usePasswordMutation = () => {
    return useMutation({
        mutationKey: ["change-password"],
        mutationFn: async (payload) => {
            const request = await authAPI.put("auth/api/v1/change-password", payload);
            return request.data;
        }
    });
};

const Index = () => {
    const currentPasswordRef = useRef<HTMLInputElement | null>(null);
    const newPasswordRef = useRef<HTMLInputElement | null>(null);

    const [showError, setShowError] = useState(false);

    const {
        mutate: changePassword,
        error,
        isError,
        data,
    } = usePasswordMutation();

    const handleUpdate = () => {
        const payload = {
            current_password: currentPasswordRef?.current?.value,
            new_password: newPasswordRef?.current?.value,
        };
        changePassword(payload);
    };

    // Trigger error visibility and auto-hide after 2 seconds
    useEffect(() => {
        if (isError) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    const errorMessage = error?.response?.data?.detail;

    return (
        <div>
            <div className="flex items-center gap-2">
                <Link to="/profile/edit">
                    <ArrowLeft className="size-6" />
                </Link>
                <div className="text-lg font-semibold">Change Password</div>
            </div>

            <div className="mt-10">
                <div className="mb-4">
                    <div className="text-sm mb-1 font-medium">Current Password</div>
                    <Input
                        ref={currentPasswordRef}
                        className={isError ? "ring-1 ring-offset-2 ring-red-600" : ""}
                    />
                </div>

                <div className="mb-4">
                    <div className="text-sm mb-1 font-medium">New Password</div>
                    <Input
                        ref={newPasswordRef}
                        className={isError ? "ring-1 ring-offset-2 ring-red-600" : ""}
                    />
                </div>

                {showError && (
                    <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
                )}

                <div>
                    <Button onClick={handleUpdate} className="w-full">
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Index;
