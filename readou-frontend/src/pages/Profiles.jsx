import Goat from "../components/Goat.jsx"
import Lists from "../components/Lists.jsx"
import Profile from "../components/Profile.jsx"
import Reviews from "../components/Reviews.jsx"
import Navbar from "../components/Navbar.jsx"

function Profiles(){
        return (
        <div>
            <Navbar/>
            <div className="flex flex-row bg-slate-500 w-384 h-194 App">
                <div className="w-120 h-170 bg-white m-5  profile">
                    <header>Readou</header>
                    <Profile/>
                </div>
                <div className="flex flex-col bg-white h-170 w-240 m-5 content">
                    <div className="bg-blue-400 flex flex-row h-70 justify-center items-center ">
                        <Goat/>
                    </div>
                    <div className="flex flex-row bg-green-400 justify-center items-center h-80 gap-15">
                        <Lists/>
                        <Reviews/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles