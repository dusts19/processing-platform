import type { InputHTMLAttributes } from "react";

type InputProps = {
    label?: string;
    error?: string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
    label,
    error,
    className = "",
    id,
    ...props
}: InputProps) => {
    return(
        <div className="w-full space-y-1">
            {label && <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>}
            
            <input 
                id={id}
                className={`
                    w-full border rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                    ${className}
                `}
                {...props}
            />
            
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        
        </div>
        
    )
}
export default Input;