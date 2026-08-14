import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


function ListContent(){
    const user_id = localStorage.getItem('user_id');
    const { list_id } = useParams();
    const [listContent, setListContent] = useState([]);

    useEffect(() => {
        async function fetchListContent() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/${user_id}/profile/lists/${list_id}`);
                const data = await response.json();
                setListContent(data);
            } catch (error) {
                console.error('Error fetching list content:', error);
            }
        }
        fetchListContent();
    }, [list_id]);

    return (
        <div>
            <Navbar/>
            <div>
                {listContent.map((story) => (
                    <div key={story.id}>
                        <img src={story.cover_url}/>
                        <h2>{story.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListContent;