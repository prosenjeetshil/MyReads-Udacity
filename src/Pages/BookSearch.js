import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Section/Book'
import * as BooksAPI from '../BooksAPI'


// 
class BookSearch extends Component {

    state = {
        books:[],
        searchResult:[],
        hasError:false
    }

    componentDidMount(){
        this.setState({
            books: this.props.location.state.booksFromHomepage})
    }

    onSearch = (event) => {
        const searchQuery = event.target.value
        if(searchQuery) {
            BooksAPI.search(searchQuery).then((resultBooks)=>{
                if(!resultBooks || resultBooks.hasOwnProperty('error')){
                    this.setState({searchResult: [], hasError: true })
                } else {
                    this.setState({searchResult: resultBooks, hasError:false})
                    this.syncBookShelfProperty()
                }
            })
        } else {
            this.setState({searchResult: [] })
        }
    }

    syncBookShelfProperty = () => {
        const books= this.state.books
        const searchResult = this.state.searchResult
        if(searchResult.length > 0) {
                books.forEach((book) => {
                    searchResult.forEach((searchResultBook) =>{
                        if(book.id === searchResultBook.id) {
                            searchResultBook.shelf = book.shelf
                        }
                    })
                })
        }
        this.setState({searchResult: searchResult})
    }

    onChangeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then((result) => {
            book.shelf = shelf
            var updatedBooks = this.state.books.filter((resultBook) =>resultBook.id !== book.id)
            updatedBooks.push(book)
            this.setState({books: updatedBooks})
        })

    }

   render() {
       const searchResult = this.state.searchResult
       const hasError = this.state.hasError
       return(
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input
                         type="text"
                         onChange={this.onSearch}
                         placeholder="Search by title or author"/>
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
                            onChangeShelf={this.onChangeShelf}
                        />
                    ))}
                </ol>
                </div>
                )}
                {hasError && (
                    <div>
                        <h3>No book found. Please try again !</h3>
                    </div>
                )}
            </div>
        </div>
       )
   }
}

export default BookSearch