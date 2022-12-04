import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const ShelfSection = (props) => 
{
    const {compartmentIndex,books,onChangeShelf} = props
    return(
        <div>
            <div className="bookshelf-books" key={compartmentIndex}>
                <ol className="books-grid">
                    {books.map( (book) => 
                    (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        </div>
        )
}

ShelfSection.propTypes = {
    books: PropTypes.array.isRequired,
    compartmentIndex: PropTypes.number.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default ShelfSection