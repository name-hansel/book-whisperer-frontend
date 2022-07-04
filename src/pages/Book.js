import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import BookData from "../components/BookData";
import BookSynopsis from "../components/BookSynopsis";
import BookPrices from "../components/BookPrices";

const Book = () => {
  const [goodreadsData, setGoodreadsData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [currentTab, setCurrentTab] = React.useState(0);

  const navigate = useNavigate();

  // Get part of URL which will point to goodreads link
  const { bookGoodreadsURLPart } = useParams();

  // Function to create goodreads URL from part
  const getGoodreadsURL = () => `https://www.goodreads.com/book/show/${bookGoodreadsURLPart}?from_search=true&from_srp=true&qid=LIejAtn28T&rank=1`

  // Function to get goodreads data
  const getGoodreadsData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/book?goodreads-url=${getGoodreadsURL()}`);
      setGoodreadsData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  // Get goodreads information
  React.useEffect(() => {
    getGoodreadsData();
  }, []);

  return (
    <div id="book-div">
      <div id="buttons-div">
        <button id="go-back-btn" onClick={() => navigate(-1)}>&#8249; Go back</button>
        {
          loading ? null : <div id="tabs-container">
            <button className={`tab ${currentTab === 0 ? 'active-tab' : null}`} onClick={() => setCurrentTab(0)}>Details</button>
            {
              goodreadsData.synopsis && <button className={`tab ${currentTab === 1 ? 'active-tab' : null}`} onClick={() => setCurrentTab(1)} >Synopsis</button>
            }
            <button className={`tab ${currentTab === 2 ? 'active-tab' : null}`} onClick={() => setCurrentTab(2)} >Prices</button>
          </div>
        }
      </div>
      {
        loading ? <h1>Loading...</h1> : currentTab === 0 ? <BookData goodreadsData={goodreadsData} /> : currentTab === 1 ? <BookSynopsis goodreadsData={goodreadsData} /> : <BookPrices />
      }
    </div>
  )
}

export default Book