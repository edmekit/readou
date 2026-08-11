import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profiles from "./pages/Profiles.jsx"
import Community from "./pages/Community.jsx"
import Stories from "./pages/Stories.jsx"
import Readlist from "./pages/Readlist.jsx"
import ListContent from "./pages/ListContent.jsx"

function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/profile" element={<Profiles/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/stories" element={<Stories/>}/>
            <Route path="/profile/lists" element={<Readlist/>}/>
            <Route path="/profile/lists/:list_id" element={<ListContent/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App