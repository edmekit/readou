function ReviewCard({ story, onClose }) {
    const ratings = [1,2,3,4,5]

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex flex-row bg-white rounded-xl p-6 w-[550px] shadow-xl ">
                <div>
                    <img className="w-64 h-96" 
                    src={story.cover_url}/>
                    <h2>{story.title}</h2>
                </div>
                <div className="flex flex-col items-center card">
                    <div className="ml-auto">
                        <button onClick={onClose} className="">X</button>
                    </div>
                    <div>
                    {
                        ratings.map((rating) => (
                          <button key={rating} className="star">&#9734;</button>  
                        ))
                    }
                    </div>
                    <textarea type="text" placeholder={`Thoughts on ${story.title}`}className="h-20 w-50 p-2 bg-gray-100 rounded-xl review-text" />
                    <button className="">Add to a list</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard