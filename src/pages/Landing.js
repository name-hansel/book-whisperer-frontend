import axios from 'axios';
import React from 'react'
import debounce from 'lodash.debounce'
import "../Landing.css"

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
      <div>
        {
          loading ? <h1>Loading....</h1> : searchResults.length > 0 ? searchResults.map((result) => <h1>{result.title}</h1>) : searchQuery.length > 0 ? <h5>{"No results found :("}</h5> : null
        }
      </div>
    </div>
  )
}

export default Landing