import type React from "react";
import Navbar from "./Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div>
            <Navbar />
            <main>{children}</main>

        </div>
    )
}
export default AppLayout;