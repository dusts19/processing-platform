import type React from "react";
import Navbar from "./Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div className="flex bg-gray-50 min-h-dvh">
            <Navbar />
            <main className="flex-1 p-6 overflow-x-hidden">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    )
}
export default AppLayout;