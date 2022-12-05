import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Section/Book'
import * as BooksAPI from '../BooksAPI'

//class BookSearch
//working should be
//to search and return match book list
//if not found show - not found
//works properly with multiple words, noo book thumbnail or author

export default class BookSearch extends Component {

    state = {
        books:[],
        searchResult:[],
        searchError:false
    }

    componentDidMount(){
        this.setState({
            books: this.props.location.state.booksFromHome})
    }

    searching = event => {
        const searchInput = event.target.value
        
        if(searchInput) {
            BooksAPI.search(searchInput).then((resultBooks)=>{
                if(!resultBooks || resultBooks.hasOwnProperty('error')){
                    this.setState({searchResult: [], searchError: true })
                } else {
                    this.setState({searchResult: resultBooks, searchError:false})
                    this.syncBookShelf()
                }
            })
        } else {
            this.setState({searchResult: [] })
        }
    }

    syncBookShelf = () => {
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

    changeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then((result) => {
            book.shelf = shelf
            var updatedBooks = this.state.books.filter((resultBook) =>resultBook.id !== book.id)
            updatedBooks.push(book)
            this.setState({books: updatedBooks})
        })

    }

   render() {
       const searchResult = this.state.searchResult
       const searchError = this.state.searchError
       return(
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input
                         type="text" onChange={this.searching} placeholder="Search by title or author"/>
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
                            changeShelf={this.changeShelf}
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
}