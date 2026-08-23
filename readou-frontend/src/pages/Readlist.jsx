import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Readlist() {
    const token = localStorage.getItem('token');
    const [lists, setLists] = useState([]);
    const [addList, setAddList] = useState(false);
    const [list_name, setListName] = useState('');

    useEffect(() => {
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
        fetchLists();
    }, [lists]);

    async function add_list(e) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/add_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list_name })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="">
            <Navbar/>
            <button className="bg-green-500 p-2 rounded-md"
            onClick={() => setAddList(true)}>+</button>
            <div className="flex flex-col">
                {
                    lists.map((list) => (
                        <Link key={list.list_id}to={`/profile/lists/${list.list_id}`}>{list.list_name}</Link>
                    ))
                }
            </div>
            {
                addList && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="flex flex-col bg-white rounded-xl p-6 w-[550px] shadow-xl ">
                        <button onClick={() => setAddList(false)}>X</button>
                        <input type="text" placeholder="List name" 
                        className=" p-2 m-2 shadow-md" 
                        onChange={(e) => setListName(e.target.value)}/>
                        <button
                        onClick={add_list}>Create List</button>
                    </div>
                </div>)
            }
        </div>
    );
}

export default Readlist;