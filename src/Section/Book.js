import React from 'react'
import PropTypes from 'prop-types'
import noThumbnailImage from '../icons/no_cover_thumb.gif'

const Book = (props) => 
{
    const {book,onChangeShelf} = props
    return(
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                             style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noThumbnailImage})` }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                onChange={(event) => onChangeShelf(book,event.target.value)}
                                value={book.shelf ? book.shelf : 'none'}>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">In Progress</option>
                                <option value="wantToRead">Next Up</option>
                                <option value="read">Completed</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title ? book.title : null}</div>
                    { 
                        book.authors &&
                        book.authors.map((author,index) =>(
                        <div className="book-authors" key={index}>{author}</div>
                    ))}
            </div>
        </li>
    )
}

// PropTypes are used to make sure the datatype receive is valid
Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Book