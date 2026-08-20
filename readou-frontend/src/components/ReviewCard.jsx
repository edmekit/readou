import { useState } from "react";

function ReviewCard({ user_id, story, onClose }) {
    const ratings = [1,2,3,4,5]
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    
    async function addReview(e) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/stories/add_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, story_id: story.id, rating, review})
        });
        const data = await response.json();
        console.log(data);
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex flex-row bg-[#202830] rounded-xl p-6 w-[550px] shadow-xl ">
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
                        {ratings.map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="star text-3xl"
                            >
                                {star <= rating ? "★" : "☆"}
                            </button>
                        ))}
                    </div>
                    <textarea type="text" placeholder={`Thoughts on ${story.title}`}
                    value={review} onChange={(e) => setReview(e.target.value)} 
                    className="h-20 w-50 p-2 bg-gray-100 rounded-xl review-text" />
                    <button
                    onClick={addReview} 
                    className="bg-green-300 p-3 m-5">Submit review</button>
                    <button className="bg-blue-300 p-3 m-5">Add to a list</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard