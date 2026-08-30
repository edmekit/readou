import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

function Readlist() {
    const token = localStorage.getItem('token');
    const [lists, setLists] = useState([]);
    const [addList, setAddList] = useState(false);
    const [list_name, setListName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLists();
    }, [lists]);

    async function fetchLists() {
        try {
        const response = await fetch(`http://127.0.0.1:8000/profile/lists`,{
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json();
                setLists(data);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        }

    async function add_list(e) {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/add_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ list_name })
        });
        const data = await response.json();
        console.log(data);
        setAddList(false);
        setLoading(false);
    }

    async function delete_list(list_id) {
        const response = await fetch(`http://127.0.0.1:8000/delete_list/${list_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        fetchLists();
    }

    return (
        <div className="min-h-screen bg-[#14181C] text-white">
            <Navbar/>
            <button className="bg-green-500 p-2 rounded-md"
            onClick={() => setAddList(true)}>+</button>
            <div className="flex flex-col">
                {
                    lists.map((list) => (
                        <div
                        key={list.list_id} 
                        className="flex justify-between min-h-[50px] w-50">
                        <Link to={`/profile/lists/${list.list_id}`}>{list.list_name}</Link>
                        <button
                        onClick={() => delete_list(list.list_id)} 
                        className="border-2 rounded-full w-[25px] h-[25px]">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        </div>
                    ))
                }
            </div>
            {
                addList && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="flex flex-col bg-[#202830] rounded-xl p-6 w-[550px] shadow-xl ">
                        <input type="text" placeholder="List name" 
                        className=" p-2 m-2 shadow-md" 
                        onChange={(e) => setListName(e.target.value)}/>
                        <button
                        className="text-white text-cyan-400 drop-shadow-[0_0_10px_#22d3ee] p-3 m-5"
                        onClick={add_list}
                        disabled={loading}>
                            { loading ? 'Making List' : 'Create List'}
                        </button>
                    </div>
                </div>)
            }
        </div>
    );
}

export default Readlist;