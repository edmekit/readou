function StoryCard({ story, onClick }) {
    return (
        <div className="flex flex-col border-2 border-black p-5 cursor-pointer bg-gray-300"
        onClick={onClick}> 
            <img className="w-64 h-96" 
            src={story.cover_url}/>
            <h2 className="text-lg text-white">{story.title}</h2>
        </div>
    )
}
export default StoryCard