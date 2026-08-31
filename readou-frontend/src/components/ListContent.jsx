import { useEffect, useState } from "react";
import { faAngleDown, faAngleRight, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ListContent({ list, fetchLists }) {
    const token = localStorage.getItem('token');
    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [listContent, setListContent] = useState([]);

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

    async function fetchListContent() {
            setLoading(true);
            setOpen(!open);
            try {
                
                const response = await fetch(`http://127.0.0.1:8000/profile/lists/${list.list_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setListContent(data);
            } catch (error) {
                console.error('Error fetching list content:', error);
            } finally {
                setLoading(false);
            }
        }

    return (
        <div>
            <div
            key={list.list_id} 
            className="flex justify-between min-h-[50px] w-50">
                <div className="flex flex-row gap-5">
                    <button
                    onClick={fetchListContent}
                    className="border-2 rounded-full w-[25px] h-[25px]">
                        { open ? 
                        <FontAwesomeIcon icon={faAngleDown}  /> :
                        <FontAwesomeIcon icon={faAngleRight} />
                        }
                    </button>
                    <p className="text-[#D8E0E8]">{list.list_name}</p>
                </div>
                <button
                onClick={() => delete_list(list.list_id)} 
                className="border-2 rounded-full w-[25px] h-[25px]">
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </div>

            { 
                open && (
                    <div>
                        { loading ? (
                            <p>Loading...</p>
                        ) :
                        (<div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
                            {listContent.map((manga) => (
                                <div key={manga.title} className="flex flex-row gap-5">
                                    <img src={manga.cover_url} 
                                    className="h-[130px] w-[85px] m-2" />
                                </div>
                            ))}
                        </div>
                        )
                    }
                    </div>
                )
            }
        </div>
    )
}

export default ListContent;