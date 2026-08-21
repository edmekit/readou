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
        <div className="flex flex-col items-center justify-center h-screen bg-[#14181C]">
            <form className="flex flex-col 
            items-center p-5  bg-[#202830] text-white rounded-xl"
            onSubmit={(e) => login(e)}>
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
                className="bg-cyan-500 text-white hover:shadow-[0_0_25px_#22d3ee] min-w-[180px] p-3 rounded-full"
                onClick={() => {
                    navigate('/register');
                }}>Register</button>
            </form>
 
        </div>
    )
}

export default Register