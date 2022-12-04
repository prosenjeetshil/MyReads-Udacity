import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AddBook = (props) => 
{
    const {currentBooks} = props
    return (
        <div className='open-search'>
               <Link to={{
                   pathname:'/search',
                   state: {
                       booksFromHomepage: currentBooks
                       }}}/>
        </div>
    )
}

// PropTypes are used to make sure the datatype receive is valid
AddBook.propTypes = {
    currentBooks: PropTypes.array.isRequired
}
export default AddBook