import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Readlist() {
    const user_id = localStorage.getItem('user_id');
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/${user_id}profile/lists`);
                const data = await response.json();
                setLists(data);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        }
        fetchLists();
    }, []);

    return (
        <div className="bg-slate-400">
            <Navbar/>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center">
                {
                    lists.map((list) => (
                        <Link key={list.list_id}to={`/profile/lists/${list.list_id}`}>{list.list_name}</Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Readlist;