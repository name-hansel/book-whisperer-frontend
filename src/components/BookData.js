import React from 'react'

const BookData = ({ goodreadsData }) => {
  return (
    <div id="book-info-container">
      <img id="book-cover" src={goodreadsData.imageSource} alt={`Book cover of ${goodreadsData.title}`} />
      <div id="book-info">
        <h1 id="book-title">{goodreadsData.title}</h1>
        <h1 id="book-subtitle">{goodreadsData.subtitle}</h1>
        <h1 id="book-authors">by {goodreadsData.author.join(", ")}</h1>
        <h1 id="book-rating">Rating: {goodreadsData.rating}/5</h1>
        <h1 className="book-number">{`(${goodreadsData.numberOfRatings} ratings, ${goodreadsData.numberOfReviews} reviews)`}</h1>
      </div>
    </div>
  )
}

export default BookData