import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Book = () => {
  const [goodreadsData, setGoodreadsData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

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
      <button id="go-back-btn" onClick={() => navigate(-1)}>&#8249; Go back</button>
      {
        loading ? <h1>Loading...</h1> : <>
          <div id="book-info-container">
            <img id="book-cover" src={goodreadsData.imageSource} alt={`Book cover of ${goodreadsData.title}`} />
            <div id="book-info">
              <h1 id="book-title">{goodreadsData.title}</h1>
              <h1 id="book-subtitle">{goodreadsData.subtitle}</h1>
              <h1 id="book-authors">by {goodreadsData.author.join(", ")}</h1>
              <h1 id="book-rating">Rating: {goodreadsData.rating}/5</h1>
              <h1 class="book-number">{`(${goodreadsData.numberOfRatings} ratings, ${goodreadsData.numberOfReviews} reviews)`}</h1>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Book