import { Link } from "react-router-dom"

function Lists({ lists }) {
    return (
        <div className="flex flex-col list">
            <Link to="/profile/lists">Lists </Link>
            {
                lists.map((list) => (
                    <h1 key={list.list_id}>{list.list_name}</h1>
                ))
            }
        </div>
    )
}

export default Lists