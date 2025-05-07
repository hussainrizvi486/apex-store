import { cn } from "@utils/index"
import { FC } from "react"

interface SpinnerProps {
    className?: string,
    size?: "sm" | "md" | "lg" | "xl",
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark",
}

export const Spinner: FC<SpinnerProps> = ({ className, size = "md", color = "primary" }) => {
    // Size classes
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10",
        xl: "w-16 h-16"
    }

    const colorClasses = {
        primary: "fill-primary",
        secondary: "fill-secondary",
        success: "fill-green-500",
        warning: "fill-yellow-500",
        danger: "fill-red-500",
        info: "fill-blue-500",
        light: "fill-gray-100",
        dark: "fill-gray-800"
    }

    return (
        <div className="flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                    "animate-[spin_0.8s_linear_infinite]",
                    sizeClasses[size],
                    colorClasses[color],
                    className || ""
                )}
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                />
            </svg>
        </div>
    )
}