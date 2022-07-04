import React from 'react'

const BookData = ({ goodreadsData }) => {
  return (
    <div id="book-info-container">
      <div id="book-info-basic-container">
        <img id="book-cover" src={goodreadsData.imageSource} alt={`Book cover of ${goodreadsData.title}`} />
        <div id="book-info">
          <a href={goodreadsData.goodreadsLink} target="_blank" rel="noopener noreferrer"><h1 id="book-title">{goodreadsData.title}</h1></a>
          <h1 id="book-subtitle">{goodreadsData.subtitle}</h1>
          <h1 id="book-authors">by {goodreadsData.author.join(", ")}</h1>
          <h1 id="book-rating">Rating: {goodreadsData.rating}/5</h1>
          <h1 className="book-number">{`(${goodreadsData.numberOfRatings} ratings, ${goodreadsData.numberOfReviews} reviews)`}</h1>
        </div>
      </div>
      <div id="book-genres-container">
        {
          goodreadsData.genres.length > 0 && <>
            {/* <h1 className="section-heading">Genres</h1> */}
            <ul id="genres-list">
              {
                goodreadsData.genres.map(genre => <li key={genre} className='genre'>{genre}</li>)
              }
            </ul>
          </>
        }
      </div>
    </div>
  )
}

export default BookData