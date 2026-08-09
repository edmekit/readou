function Lists({ lists }) {
    return (
        <div className="flex flex-col list">
            <header>LISTS</header>
            {
                lists.map((list) => (
                    <h1 key={list.list_id}>{list.list_name}</h1>
                ))
            }
        </div>
    )
}

export default Lists