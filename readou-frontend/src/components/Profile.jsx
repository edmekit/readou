function Profile({ user }){
    return (
        <div>
            <img src={user.user_pfp}/>
            <h3>{user.user_name}</h3>
            <p>reviewed</p>
        </div>
    )
}

export default Profile