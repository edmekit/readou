import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Profiles from "./pages/Profiles.jsx"
import Community from "./pages/Community.jsx"
import Stories from "./pages/Stories.jsx"
import Readlist from "./pages/Readlist.jsx"
import ListContent from "./components/ListContent.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Ratings from "./pages/Ratings.jsx"

function App(){
    const [token ,setToken] = useState(localStorage.getItem('token'));
    const [profile, setProfile] = useState([])
    const [goats, setGoats] = useState([])
    const [lists , setLists] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false);
     const [stories, setStories] = useState([])

    useEffect(() => {
        if (!token) {
            console.log("No user_id found, user is not logged in");
            return;
        }
            async function fetchProfiles() {
                setLoading(true);
                try {
                    const response = await fetch(`http://127.0.0.1:8000/profile`,{
                            headers : {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                    const data = await response.json();
                    setProfile(data.user_info);
                    setGoats(data.user_goat);
                    setLists(data.user_lists);
                    setReviews(data.user_reviews);
                } catch (error) {
                    console.error('Error fetching profiles:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchProfiles();
        }, [token]);

        useEffect(() => {
            fetch(`http://127.0.0.1:8000/stories`)
            .then(res => res.json())
            .then(data => setStories(data));
        }, []);

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login setToken={setToken}/>}/>
            <Route path="/profile" element={<Profiles profile={profile} goats={goats} lists={lists} reviews={reviews} loading={loading}/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/stories" element={<Stories stories={stories} lists={lists}/>}/>
            <Route path="/profile/lists" element={<Readlist/>}/>
            <Route path="/profile/lists/:list_id" element={<ListContent/>}/>
            <Route path="/reviews" element={<Ratings/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App