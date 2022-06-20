import {
  Routes,
  Route,
} from "react-router-dom";

import Book from "./pages/Book";
import Landing from "./pages/Landing";

import "./css/Landing.css";
import "./css/SearchResultItem.css"

function App() {
  return (
    <div className="body">
      <h1 className="title">Book Whisperer</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="book/:bookTitle" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
