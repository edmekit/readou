import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function login(e) {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            console.log("login response:", data);

            if (response.ok && data && data.user_id) {
                localStorage.setItem('user_id', String(data.user_id));
                console.log("stored user_id:", data.user_id);
                navigate('/profile');
            } else {
                setError('Account not found. Register instead.');
            }
        } catch (error){
            setError('Something went wrong.')
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#14181C]">
            {error && <p className="text-red-500 m-5">{error}</p>}
            <form className="flex flex-col 
            items-center p-5 bg-[#202830] text-white"
            onSubmit={(e) => login(e)}>
                <input type="text" 
                className="w-full m-5 p-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
                <input type="password" value={password}
                className="w-full m-5 p-5"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
                <button type="submit"
                    disabled={loading}
                    className="bg-[#8a00c4] text-white hover:shadow-[0_0_25px_#8a00c4] min-w-[180px] p-3 m-5 rounded-full">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                <button type="button"
                disabled={loading}
                className="bg-cyan-500 text-white hover:shadow-[0_0_25px_#22d3ee] min-w-[180px] p-3 rounded-full"
                onClick={() => {
                    navigate('/register');
                }}>Register</button>
            </form>
        </div>
    )
}

export default Login