import { Link } from "react-router-dom"
function Navbar(){
    return (
        <nav className="flex justify-between items-center p-4 bg-slate-500">
            <Link to ="/community" className="text-2xl font-bold">
                Readou
            </Link>
            <div className="flex gap-6">
                <Link to="/community">Community</Link>
                <Link to="/stories">Stories</Link>
                <Link to="/">Profile</Link>
            </div>
        </nav>
    )
}

export default Navbar