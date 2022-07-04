import React from 'react'

const BookSynopsis = ({ goodreadsData }) => {
  return (
    <div id="book-synopsis-container">
      <h1 className="section-heading">Synopsis</h1>
      <p id="synopsis" dangerouslySetInnerHTML={{ __html: goodreadsData.synopsis }}></p>
    </div>
  )
}

export default BookSynopsis