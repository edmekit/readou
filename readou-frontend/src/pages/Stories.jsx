import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import ReviewCard from "../components/ReviewCard";
import { useState, useEffect } from "react";

function Stories(){
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/stories')
        .then(res => res.json())
        .then(data => setStories(data));
    }, []);

    return (
        <div>
            <Navbar/>
            <input type="text" placeholder="Search" 
            className="border-1 border-black rounded-[20px] p-2 m-2 shadow-md" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                {stories.map((story) => (
                    <StoryCard key={story.id} story={story}
                    onClick={() => setSelectedStory(story)}/>
                ))}
            </div>
            {selectedStory && (
            <ReviewCard
                story={selectedStory}
                        onClose={() => setSelectedStory(null)}/>
            )}
        </div>
    )
}

export default Stories