import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import ShelfSection from './ShelfSection'
import AddBook from './AddBook'

class Shelf extends Component {

    state = {
        books: []
    }

    onChangeShelf = (book, newShelf) => 
    {
        BooksAPI.update(book,newShelf).then((result) =>{
            console.log('Update response', result)
            book.shelf = newShelf
            var updatedBooks = this.state.books.filter((resultBook) =>resultBook.id !== book.id)
            updatedBooks.push(book)
            this.setState({books: updatedBooks})
        })
    }

    componentDidMount() 
    {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }

    render() {
        const compartments = [
            {type: 'currentlyReading', title: 'In Progress'},
            {type: 'wantToRead', title: 'Next Up'},
            {type: 'read', title: 'Completed'}
        ]
        return(
            <div>
            <div className='list-books-content'>
                { this.state.books.length > 0 &&
                    <div>
                        { compartments.map( (compartment,index) => {
                            const compartmentBooks =this.state.books.filter( (book) =>
                            book.shelf===compartment.type
                         )
                            return(
                                <div className="bookshelf" key={index}>
                                    <h2 className="bookshelf-title">{compartment.title}</h2>
                                        <ShelfSection
                                            key={index}
                                            books={compartmentBooks}
                                            compartmentsList={compartments}
                                            onChangeShelf={this.onChangeShelf}
                                        />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <AddBook
                currentBooks={this.state.books}
            />
            </div>
        )
    }
}
export default Shelf