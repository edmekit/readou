import { Link } from "react-router-dom"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react";

function Reviews({ reviews }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="review bg-[#39434d]">
            <AnimatePresence mode="wait">
                {hovered ?
                <motion.div
                key="hovered"
                initial = {{ opacity: 0, scale: .9 }}
                animate = {{ opacity: 1, scale: 1 }}
                exit = {{ opacity: 0, scale: .9 }}
                transition = {{ duration: .2 }}
                className="review bg-[#39434d] flex flex-col justify-center items-center">
                    <p>See all reviews</p>
                    <Link
                    className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]" 
                    to="/reviews">&rarr;</Link>
                </motion.div>
                :
                <motion.div
                key="unhovered"
                initial = {{ opacity: 0, scale: .9 }}
                animate = {{ opacity: 1, scale: 1 }}
                exit = {{ opacity: 0, scale: .9 }}
                transition = {{ duration: .2 }}
                className="grid grid-cols-2 gap-2 p-5">
                {
                    reviews.map((review) => (
                        <img src={review.cover_url} key={review.rating_id} 
                        className="w-[90px] h-[130px]"/>
                    ))
                }
                </motion.div>
                } 
           </AnimatePresence>
        </div>
    )
}

export default Reviews