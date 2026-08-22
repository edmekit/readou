import Navbar from "./Navbar.jsx";

function ProfileLoading(){
    return (
        <div className="min-h-screen bg-[#14181C]">
            <Navbar/>
            <div className="flex flex-col lg:flex-row w-full min-h-[650px] max-w-7xl mx-auto gap-10 p-5">
                <div className=" w-full lg:w-1/3 bg-[#202830] min-h-[600px] rounded-md p-5 animate-pulse">
                </div>
                <div className="flex flex-col w-full lg:w-2/3 bg-[#202830] min-h-[650px] gap-4 rounded-md p-5 text-[#D8E0E8] animate-pulse">
                    <div className="flex justify-center min-h-[250px] border-1 items-center rounded-lg animate-pulse">
                    </div>
                    <hr className="border-1 border-[#D8E0E8]"/>
                    <div className="flex flex-col sm:flex-row justify-center min-h-[300px] items-center gap-5 animate-pulse">
                        <div className="list"></div>
                        <div className="review"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLoading