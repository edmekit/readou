import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function register(e) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Link to ="/login">Login</Link>
        <form className="flex flex-col border-2 border-black p-5 w-100 h-90"
        onSubmit={register}>
            <input type="text" value={username}
             onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" />
            <input type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
            <button type="submit">Register</button>
        </form>
        </div>
    )
}

export default Register