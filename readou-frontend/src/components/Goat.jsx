function Goat({ goat }){
    return (
        <div className="grid grid-cols-5 gap-10 p-10 goat">
            {
                goat.map((goat) => (
                    <div key={goat.id}>
                        <img className="w-40 h-60" 
                        src={goat.cover_url}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Goat
