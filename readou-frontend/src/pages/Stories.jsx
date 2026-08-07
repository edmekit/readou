import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import ReviewCard from "../components/ReviewCard";
import { useState, useEffect, useMemo } from "react";

function Stories(){
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch('http://127.0.0.1:8000/stories')
        .then(res => res.json())
        .then(data => setStories(data));
    }, []);

    const filteredStories = useMemo(() => {
        return stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()));
    }, [stories, search]);

    const visibleStories = search === "" ? stories : filteredStories;

    return (
        <div>
            <Navbar/>
            <input type="text" value={search} 
            onChange= {(e) => setSearch(e.target.value)} placeholder="Search" 
            className="border-1 border-black rounded-[20px] p-2 m-2 shadow-md" />

            {
                visibleStories.length > 0 ? 
                (<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                    {visibleStories.map((story) => (
                        <StoryCard key={story.id} story={story}
                        onClick={() => setSelectedStory(story)}/>
                    ))}
                </div>)
                :
                (<div className="flex flex-col justify-center items-center w-full h-130 text-gray-400 text-2xl">
                    <h1>No stories found</h1>
                </div>)
            }


            {selectedStory && (
            <ReviewCard
                story={selectedStory}
                        onClose={() => setSelectedStory(null)}/>
            )}
        </div>
    )
}

export default Stories