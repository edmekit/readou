import { Link, useNavigate } from "react-router-dom"
function Navbar(){
    const navigate = useNavigate();
    function logout(){
        localStorage.removeItem('user_id');
        navigate('/');
    }

    return (
        <nav className="flex justify-between items-center p-4 bg-[#202830] text-[#D8E0E8] font-bold">
            <Link to ="/community" className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">
                readou
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