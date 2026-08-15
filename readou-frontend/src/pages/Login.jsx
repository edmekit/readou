import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();

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
            console.log("No user_id returned from backend");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col border-2 border-black p-5 w-100 h-90"
            onSubmit={(e) => login(e)}>
                <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
                <input type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

export default Login