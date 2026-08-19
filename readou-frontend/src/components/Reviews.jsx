import { Link } from "react-router-dom"

function Reviews({ reviews }) {
    return (
        <div className="review">
            <Link to="/reviews">Reviews</Link>
            {
                reviews.map((review) => (
                    <div key={review.rating_id}>{review.title}</div>
                ))
            }

            
        </div>
    )
}

export default Reviews