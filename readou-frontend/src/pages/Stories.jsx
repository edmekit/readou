import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { useState, useEffect } from "react";

function Stories(){
    const [stories, setStories] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/stories')
        .then(res => res.json())
        .then(data => setStories(data));
    }, []);

    return (
        <div>
            <Navbar/>
            <input type="text" placeholder="Search" />
            <div className="grid grid-cols-5">
                {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    )
}

export default Stories