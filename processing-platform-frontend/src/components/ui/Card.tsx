import type { ReactNode } from "react"

type CardProps = {
    title?: string;
    titleAlign?: "left" | "center";
    children: ReactNode;
    className?: string;
}

export const Card = ({title, titleAlign, children, className}: CardProps) => {
    return(
        <div className={`
                bg-white p-6 rounded-lg shadow
                ${className}
            `}
        >   
            {title && (
                <h2 
                    className={`text-lg font-semibold mb-4 
                        ${titleAlign === "center" ? "text-center" : "text-left"}
                    `}
                >
                    {title}
                </h2>
            )}
            {children}

        </div>
    );
};