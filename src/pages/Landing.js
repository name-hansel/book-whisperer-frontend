import axios from 'axios';
import React from 'react';
import debounce from 'lodash.debounce';
import "../css/Landing.css";
import SearchResultItem from '../components/SearchResultItem';

const Landing = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const debounceSearch = React.useCallback(debounce(async (query) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search?query=${query}`);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  }, 250), []);

  React.useEffect(() => {
    setLoading(false);
  }, [searchResults])

  React.useEffect(() => {
    if (!searchQuery.length) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className='body'>
      <h1 className="title">Book Whisperer</h1>
      <div>
        <form>
          <input id="search" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for a book, author, etc." />
        </form>
      </div>
      <div className="search-result-container">
        {
          loading ? <h1 className='message-text'>Loading....</h1> : searchResults.length > 0 ? searchResults.map((result) => <SearchResultItem result={result} />) : searchQuery.length > 0 ? <h5 className='message-text'>{"No results found :("}</h5> : null
        }
      </div>
    </div>
  )
}

export default Landing