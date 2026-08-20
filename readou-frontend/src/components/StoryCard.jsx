function StoryCard({ story, onClick }) {
    return (
        <div className="flex flex-col p-2 cursor-pointer bg-[#202830] "
        onClick={onClick}> 
            <img className="w-[150px] h-[210px]" 
            src={story.cover_url}/>
        </div>
    )
}
export default StoryCard