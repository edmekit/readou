import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
function Lists({ lists }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="list">
            <AnimatePresence mode="wait">
                {hovered ?
                <motion.div
                key="hovered"
                initial = {{ opacity: 0, scale: .9 }}
                animate = {{ opacity: 1, scale: 1 }}
                exit = {{ opacity: 0, scale: .9 }}
                transition = {{ duration: .2 }}
                className="review  flex flex-col justify-center items-center">
                    <p>See all lists</p>
                    <Link
                    className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]" 
                    to="/profile/lists">&rarr;</Link>
                </motion.div>
                :
                <motion.div
                key="unhovered"
                initial = {{ opacity: 0, scale: .9 }}
                animate = {{ opacity: 1, scale: 1 }}
                exit = {{ opacity: 0, scale: .9 }}
                transition = {{ duration: .2 }}
                className="list">
                {
                    lists.map((list) => (
                        <h1
                        className="text-2xl m-3 bg-[#45494d] p-3 rounded-lg" 
                        key={list.list_id}>{list.list_name}</h1>
                    ))
                }
                </motion.div>
                } 
           </AnimatePresence>
        </div>
    )
}

export default Lists