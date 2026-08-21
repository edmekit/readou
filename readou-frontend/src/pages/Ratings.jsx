import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
function Ratings(){
    const user_id = localStorage.getItem('user_id');
    const [ratings, setRatings] = useState([])
    const stars = [1, 2, 3, 4, 5];

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/${user_id}/reviews`)
        .then(res => res.json())
        .then(data => setRatings(data))
    }, [])

    return(
        <div className="min-h-screen bg-[#14181C] text-white">
            <Navbar/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {
                    ratings.map((rating) => (
                        <div key={rating.rating_id} className="flex flex-row p-5 m-5 min-w-[400px] bg-[#202830]">
                            <div className="flex flex-col">
                                <img src={rating.cover_url} className="w-45 h-70"/>
                                <h2>{rating.title}</h2>
                            </div>
                            <div className="flex flex-col m-5">
                            {stars.map((star) => (
                                <button
                                    key={star}
                                    className="star text-cyan-500 text-5xl drop-shadow-[0_0_10px_#22d3ee]"
                                >
                                    {star <= rating.rating ? "★" : "☆"}
                                </button>
                            ))}
                            </div>
                            <h2>{rating.review}</h2>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Ratings