type LoadingSpinnerProps = {
    size?: "sm" | "md" | "lg",
    className?: string
}

const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10"
}

const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {

    return(
        <div 
            className={`
                ${sizeMap[size]}
                border-2 border-gray-300 border-t-blue-500
                rounded-full animate-spin
                ${className}
            `}
        />
    )
};

export default LoadingSpinner;