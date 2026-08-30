import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import ReviewCard from "../components/ReviewCard";
import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";

function Stories({ stories }) {
   
    const [selectedStory, setSelectedStory] = useState(null);
    const [search, setSearch] = useState('');
    const container = {
        "hidden": {
            opacity: 1,
        },
        "visible": {
            opacity: 1,
            transition: {
                staggerChildren: 0.07
            }
        }
    }

    const item = {
        "hidden": {
            opacity: 0,
            x: 20
        },
        "visible": {
            opacity: 1,
            x: 0
        }
    }

    const filteredStories = useMemo(() => {
        return stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()));
    }, [stories, search]);

    const visibleStories = search === "" ? stories : filteredStories;

    return (
        <div className="min-h-screen bg-[#202830]">
            <Navbar/>

            <div className="flex flex-col justify-between items-center p-4 bg-[#202830]">
                <input type="text" value={search} 
                onChange= {(e) => setSearch(e.target.value)} placeholder="Search" 
                className="border-1 border-black bg-white rounded-[20px] p-2 m-2 shadow-md" />
                {
                    visibleStories.length > 0 ? 
                    (<motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
                        {visibleStories.map((story) => (
                            <StoryCard
                            variants={item}
                            key={story.id} story={story}
                            onClick={() => setSelectedStory(story)}/>
                        ))}
                    </motion.div>)
                    :
                    (<div className="flex flex-col justify-center items-center w-full h-130 text-gray-400 text-2xl">
                        <h1>No stories found</h1>
                    </div>)
                }
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