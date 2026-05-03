import type { ReactNode } from "react";

type TableProps = {
    headers: string[];
    children: ReactNode;
    className?: string;
} 

export const Table = ({
    headers, 
    children, 
    className = ""
} : TableProps) => {

    return(
        <div className={`bg-white rounded-lg shadow ${className}`}>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        {headers.map((header) => 
                            <th key={header} className="text-left p-3">
                                {header}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {children ? children : (
                        <tr>
                            <td colSpan={headers.length} className="p-4 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

