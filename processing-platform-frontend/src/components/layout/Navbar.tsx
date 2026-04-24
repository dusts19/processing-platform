import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/api-keys">API Keys</Link>
            <Link to="/playground">Playground</Link>
        </nav>
    )
}

export default Navbar;