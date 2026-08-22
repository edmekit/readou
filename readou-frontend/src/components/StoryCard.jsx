import { motion } from "motion/react";
function StoryCard({ variants ,story, onClick }) {
    return (
        <motion.div
            variants={variants}
            layoutId={story.id}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 30
            }}
            className="flex flex-col p-2 cursor-pointer bg-[#202830] "
            onClick={onClick}> 
                <img className="w-[150px] h-[210px]" 
                src={story.cover_url}/>
        </motion.div>
    )
}
export default StoryCard