import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//function AddBook
//links to /search
export default function AddBook(props) {

    const { currentBooks } = props
    return (
        <div className='open-search'>
            {/* Navigation */}
            <Link to={{
                pathname: '/search',
                state: {
                    booksFromHome: currentBooks
                }
            }} />
        </div>
    )
}

// PropTypes are used to make sure the datatype receive is valid
AddBook.propTypes = {
    currentBooks: PropTypes.array.isRequired
};