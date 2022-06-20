import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultItem = ({ result }) => {
  const { title, author, imageSource } = result;

  return (
    <Link to={`/book/${encodeURI(title)}`}>
      <div className="search-result-item">
        <img className="result-image" src={imageSource} alt={title} />
        <div className="result-text">
          <h1 className="result-title">{title}</h1>
          <h3 className="result-author">{author}</h3>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultItem