import axios from 'axios';
import React from 'react';
import debounce from 'lodash.debounce';
import { useSearchParams } from "react-router-dom";

import SearchResultItem from '../components/SearchResultItem';

const Landing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Function to get results
  const getResults = async (query) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search?query=${query}`);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Debounce API call (getResults)
  const debounceSearch = React.useCallback(debounce(async (query) => {
    await getResults(query);
  }, 100), []);

  // Check url to see if query already exists
  React.useEffect(() => {
    if (!searchParams.get("query")) return;

    const existingSearchQuery = decodeURI(searchParams.get("query"));
    setLoading(true);
    setSearchQuery(existingSearchQuery);
    debounceSearch(existingSearchQuery);
  }, []);

  // Set loading to false when searchResults array changes
  React.useEffect(() => {
    setLoading(false);
  }, [searchResults])

  // Call API when searchQuery changes
  React.useEffect(() => {
    if (!searchQuery.length) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    setSearchParams({ query: searchQuery });
    setLoading(true);
    debounceSearch(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <input id="search" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for a book, author, etc." />
        </form>
      </div>
      <div className="search-result-container">
        {
          loading ? <h1 className='message-text'>Loading....</h1> : searchResults.length > 0 ? searchResults.map((result) => <SearchResultItem key={result.title} result={result} />) : searchQuery.length > 0 ? <h5 className='message-text'>{"No results found :("}</h5> : null
        }
      </div>
    </>
  )
}

export default Landing