function Goat({ goat }){
    return (
        <div className="grid grid-cols-5 gap-4 p-5">
            {
                goat.map((goat) => (
                    <div key={goat.id}>
                        <img className="w-[100px] h-[150px]" 
                        src={goat.cover_url}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Goat
