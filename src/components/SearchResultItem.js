import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultItem = ({ result }) => {
  const { title, author, imageSource, goodreadsLink } = result;
  const bookURL = goodreadsLink.split("/")[5].split("from_search")[0].split("?")[0];
  return (
    <Link to={`/book/${bookURL}`}>
      <div className="search-result-item">
        <img className="result-image" src={imageSource} alt={title} />
        <div className="result-text">
          <h1 className="result-title">{title}</h1>
          <h3 className="result-author">{author.join(", ")}</h3>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultItem