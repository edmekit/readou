function Profile({ user }){
    return (
        <div className="flex flex-col gap-5 text-[#D8E0E8]">
            <div className="flex flex-col items-center">
                <img src={user.user_pfp} className="w-[275px] h-[275px] rounded-full"/>
            </div> 
            <h3 className="text-2xl">{user.user_name}</h3>
            <p>reviewed</p>
        </div>
    )
}

export default Profile