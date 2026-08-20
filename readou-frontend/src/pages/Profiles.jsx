import Goat from "../components/Goat.jsx"
import Lists from "../components/Lists.jsx"
import Profile from "../components/Profile.jsx"
import Reviews from "../components/Reviews.jsx"
import Navbar from "../components/Navbar.jsx"
import { useState, useEffect } from "react"

function Profiles(){
    const user_id = localStorage.getItem('user_id');
    const [profile, setProfile] = useState([])
    const [goats, setGoats] = useState([])
    const [lists , setLists] = useState([])
    const [reviews, setReviews] = useState([])

        useEffect(() => {
        if (!user_id) {
            console.log("No user_id found, user is not logged in");
            return;
        }
            async function fetchProfiles() {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/${user_id}/profile`);
                    const data = await response.json();
                    setProfile(data.user_info);
                    setGoats(data.user_goat);
                    setLists(data.user_lists);
                    setReviews(data.user_reviews);
                } catch (error) {
                    console.error('Error fetching profiles:', error);
                }
            }
            fetchProfiles();
        }, []);


        return (
        <div className="min-h-screen bg-[#14181C]">
            <Navbar/>
            <div className="flex flex-col lg:flex-row w-full min-h-[650px] max-w-7xl mx-auto gap-10 p-5">
                <div className=" w-full lg:w-1/3 bg-[#202830] min-h-[600px] rounded-md p-5">
                        <Profile
                            user={profile}
                            key={profile.user_id}
                        />
                </div>
                <div className="flex flex-col w-full lg:w-2/3 bg-[#202830] min-h-[650px] gap-4 rounded-md p-5 text-[#D8E0E8]">
                    <div className="flex justify-center min-h-[250px] border-1 items-center rounded-lg">
                        <Goat 
                        goat={goats}/>
                    </div>
                    <hr className="border-1 border-[#D8E0E8]"/>
                    <div className="flex flex-col sm:flex-row justify-center min-h-[300px] items-center gap-5">
                        <Lists lists={lists}/>
                        <Reviews reviews={reviews}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles