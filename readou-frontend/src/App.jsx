import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profiles from "./pages/Profiles.jsx"
import Community from "./pages/Community.jsx"
import Stories from "./pages/Stories.jsx"

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/profile" element={<Profiles/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/stories" element={<Stories/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App