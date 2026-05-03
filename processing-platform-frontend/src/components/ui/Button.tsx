import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
}

const Button = ({
    variant="primary", 
    size="md", 
    className="", 
    isLoading=false, 
    disabled,
    children,
    ...props}: ButtonProps) => {

    return(
        <button
            disabled={disabled || isLoading}
            className={`
                rounded-md font-medium transition
                focus:outline-none focus:ring-2 focus:ring-blue-400
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}      
            `}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    )
};

export default Button;