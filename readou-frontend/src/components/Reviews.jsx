function Reviews({ reviews }) {
    return (
        <div className="review">
            <h1>Reviews</h1>
            {
                reviews.map((review) => (
                    <div key={review.rating_id}>{review.title}</div>
                ))
            }

            
        </div>
    )
}

export default Reviews