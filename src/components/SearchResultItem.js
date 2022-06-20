import React from 'react';
import "../css/SearchResultItem.css"

const SearchResultItem = ({ result }) => {
  const { title, author, imageSource } = result;

  return (
    <div className="search-result-item">
      <img className="result-image" src={imageSource} alt={title} />
      <div className="result-text">
        <h1 className="result-title">{title}</h1>
        <h3 className="result-author">{author}</h3>
      </div>
    </div>
  )
}

export default SearchResultItem