import Goat from "../components/Goat.jsx"
import Lists from "../components/Lists.jsx"
import Profile from "../components/Profile.jsx"
import Reviews from "../components/Reviews.jsx"
import Navbar from "../components/Navbar.jsx"
import { useState, useEffect } from "react"

function Profiles(){
        const [profiles, setProfiles] = useState([])
        const [goats, setGoats] = useState([])
        const [lists , setLists] = useState([])
        useEffect(() => {
            async function fetchProfiles() {
                try {
                    const response = await fetch('http://127.0.0.1:8000/profile');
                    const data = await response.json();
                    setProfiles(data.user_info);
                    setGoats(data.user_goat);
                    setLists(data.user_lists);
                } catch (error) {
                    console.error('Error fetching profiles:', error);
                }
            }
            fetchProfiles();
        }, []);


        return (
        <div>
            <Navbar/>
            <div className="flex flex-row bg-slate-500 w-384 h-194 App">
                <div className="w-120 h-170 bg-white m-5  profile">
                    <header>Readou</header>
                    {profiles.length > 0 && (
                        <Profile
                            user={profiles[0]}
                            key={profiles[0].user_id}
                        />
                    )}
                </div>
                <div className="flex flex-col bg-white h-170 w-240 m-5 content">
                    <header>Goat</header>
                    <div className="flex justify-center items-center">
                        <Goat 
                        goat={goats}/>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-15">
                        <Lists lists={lists}/>
                        <Reviews/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles