function StoryCard({ story, onClick }) {
    return (
        <div className="flex flex-col border-2 border-black p-5 cursor-pointer"
        onClick={onClick}> 
            <img className="w-64 h-96" 
            src={story.cover_url}/>
            <h2>{story.title}</h2>
        </div>
    )
}
export default StoryCard