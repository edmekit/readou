import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.detail || 'Registration failed.');
                return;
            }

            navigate('/');
    } catch (error) {
        setError('Something went wrong.')
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#14181C]">
            {error && <p className="text-red-500">{error}</p>}
            <form className="flex flex-col 
            items-center p-5  bg-[#202830] text-white rounded-xl"
            onSubmit={register}>
                <input type="text" 
                className="w-full m-5 p-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
                <input type="password" value={password}
                className="w-full m-3 p-5"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
                <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-white hover:shadow-[0_0_25px_#22d3ee] min-w-[180px] p-3 rounded-full"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    )
}

export default Register