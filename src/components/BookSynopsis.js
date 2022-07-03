import React from 'react'

const BookSynopsis = ({ goodreadsData }) => {
  return (
    <div id="book-synopsis-container">
      {
        goodreadsData.synopsis && <>
          <h1 className="section-heading">Synopsis</h1>
          <p id="synopsis" dangerouslySetInnerHTML={{ __html: goodreadsData.synopsis }}></p>
        </>
      }
      {
        goodreadsData.synopsis && goodreadsData.genres.length > 0 && <hr />
      }
      {
        goodreadsData.genres.length > 0 && <>
          <h1 className="section-heading">Genres</h1>
          <ul>
            {
              goodreadsData.genres.map(genre => <li key={genre} className='genre'>{genre}</li>)
            }
          </ul>
        </>
      }
    </div>
  )
}

export default BookSynopsis