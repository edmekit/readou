import { motion } from "motion/react";

function Goat({ goat }){
    const container = {
        "hidden": {
            opacity: 1,
        },
        "visible": {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const item = {
        "hidden": {
            opacity: 0,
            x: 20
        },
        "visible": {
            opacity: 1,
            x: 0
        },
    }

    return (
        <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-5 gap-4 p-5">
            {
                goat.map((goat) => (
                    <motion.div key={goat.id}
                    variants={item}
                    whileHover={{ scale: 1.1 }}>
                        <img className="w-[120px] h-[180px]" 
                        src={goat.cover_url}/>
                    </motion.div>
                ))
            }
        </motion.div>
    )
}

export default Goat
