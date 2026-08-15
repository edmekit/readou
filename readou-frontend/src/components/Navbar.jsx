import { Link, useNavigate } from "react-router-dom"
function Navbar(){
    const navigate = useNavigate();
    function logout(){
        localStorage.removeItem('user_id');
        navigate('/');
    }

    return (
        <nav className="flex justify-between items-center p-4 bg-slate-500">
            <Link to ="/community" className="text-2xl font-bold">
                Readou
            </Link>
            <div className="flex gap-6">
                <Link to="/community">Community</Link>
                <Link to="/stories">Stories</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar