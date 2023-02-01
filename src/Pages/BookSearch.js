import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Section/Book'
import * as BooksAPI from '../BooksAPI'

const BookSearch = ({ location }) => {
const [books, setBooks] = useState([])
const [searchResult, setSearchResult] = useState([])
const [searchError, setSearchError] = useState(false)

useEffect(() => {
    setBooks(location.state.booksFromHome)
}, [location.state.booksFromHome])

const searching = event => {
    const searchInput = event.target.value
    
    if(searchInput) {
        BooksAPI.search(searchInput).then((resultBooks)=>{
            if(!resultBooks || resultBooks.hasOwnProperty('error')){
                setSearchResult([])
                setSearchError(true)
            } else {
                setSearchResult(resultBooks)
                setSearchError(false)
                syncBookShelf()
            }
        })
    } else {
        setSearchResult([])
    }
}

const syncBookShelf = () => {
    books.forEach((book) => {
        searchResult.forEach((searchResultBook) =>{
            if(book.id === searchResultBook.id) {
                searchResultBook.shelf = book.shelf
            }
        })
    })
    setSearchResult(searchResult)
}

const changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then((result) => {
        book.shelf = shelf
        var updatedBooks = books.filter((resultBook) =>resultBook.id !== book.id)
        updatedBooks.push(book)
        setBooks(updatedBooks)
    })

}

return (
    <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
                <input
                    type="text" onChange={searching} placeholder="Search by title or author"/>
            </div>
        </div>
        <div className="search-books-results">
            {searchResult.length>0 && (
            <div>
                <div>
                    <h3> {searchResult.length} books found!</h3>
                </div>
            <ol className="books-grid">
                {searchResult.map((book) =>(
                    <Book
                        key={book.id}
                        book={book}
                        changeShelf={changeShelf}
                    />
                ))}
            </ol>
            </div>
            )}
            {searchError && (
                <div>
                    <h3>No book found. Please try again !</h3>
                </div>
            )}
        </div>
    </div>
)
}

export default BookSearch;