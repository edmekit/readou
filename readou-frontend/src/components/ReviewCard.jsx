import { useState } from "react";
import { motion } from "motion/react";
function ReviewCard({ story, onClose }) {
    const token = localStorage.getItem('token')
    const ratings = [1,2,3,4,5]
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState('')
    
    const [rateloading, setRateLoading] = useState(false)
    const [goatloading, setGoatLoading] = useState(false)
    const [reviewed, setReviewed] = useState(false)
    const [goated, setGoated] = useState(false)

    async function addReview(e) {
        e.preventDefault();
        setRateLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/add_review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :`Bearer ${token}`
                },
                body: JSON.stringify({ story_id: story.id, rating, review})
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setReviewed(true)
            } else {
                setError('Something went wrong.' + response.status);
            }
        } catch (error){
            setError('Something went wrong.')
        }  finally {
            setRateLoading(false)
        }
    }

    async function addGoat(e){
        e.preventDefault();
        setGoatLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/add_goat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({  manga_id: story.id })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setGoated(true)
            } else {
                setError('Something went wrong.' + response.status);
            }
        } catch (error){
            setError('Something went wrong.')
        }  finally {
            setGoatLoading(false)
        }
    }

    function handleClose(e){
        e.preventDefault();
        onClose()
    }


    return (
        <motion.div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <motion.div
            layoutId={story.id}
                transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 30
                }} 
            className="flex flex-row bg-[#202830] rounded-xl p-6 w-[550px] shadow-xl ">
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
                                className="star text-cyan-500 text-5xl leading-none transition-transform duration-150 hover:scale-125 hover:drop-shadow-[0_0_10px_#22d3ee]"
                            >
                                {star <= rating ? "★" : "☆"}
                            </button>
                        ))}
                    </div>
                    <textarea type="text" placeholder={`Thoughts on ${story.title}`}
                    value={review} onChange={(e) => setReview(e.target.value)} 
                    className="bg-[#29343d] text-white h-20 w-50 p-2 rounded-xl review-text " />
                    <button
                    onClick={addReview} 
                    disabled={rateloading || goatloading || reviewed}
                    className="bg-[#8a00c4] text-white hover:shadow-[0_0_25px_#8a00c4] min-w-[180px] p-3 m-5">
                        { reviewed ?
                           'Reviewed' :
                            rateloading ? 'Reviewing' : 'Review'
                        }
                    </button>
                    <button 
                    disabled={goatloading || rateloading || goated}
                    onClick={addGoat}
                    className="bg-cyan-500 text-white hover:shadow-[0_0_25px_#22d3ee] min-w-[180px] p-3">
                        { goated ?
                            'Goated' :
                            goatloading ? 'Adding to goat list' : 'Goat'
                        }
                    </button>
                    <button 
                    onClick={handleClose}>Done</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ReviewCard