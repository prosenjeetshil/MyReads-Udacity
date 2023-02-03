import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

//function ShelfSection
export default function ShelfSection(props) {
  const { compartmentIndex, books, changeShelf } = props;
  return (
    <div>
      <div className="bookshelf-books" key={compartmentIndex}>
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
}

// PropTypes are used to make sure the datatype receive is valid
ShelfSection.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};
