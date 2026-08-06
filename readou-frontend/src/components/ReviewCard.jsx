function ReviewCard({ story, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex flex-row bg-white rounded-xl p-6 w-[500px] shadow-xl ">
                <div>
                    <img className="w-64 h-96" 
                    src={story.cover_url}/>
                    <h2>{story.title}</h2>
                    <button>Review</button>
                </div>
                <div>
                    <button onClick={onClose}>X</button>
                    <p>blabla</p>
                    <input type="text" placeholder="Review" />
                </div>
            </div>
        </div>
    )
}

export default ReviewCard