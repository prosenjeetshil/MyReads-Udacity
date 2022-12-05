import React from 'react'
import Shelf from '../Section/Shelf'

//function Home 
// Main page
export default function Home() {
    return (
        <div className="list-books">
            <div className="list-books-title">
                {/* Title of react app */}
                <h1>MyReads - A Book Tracking App</h1>
            </div>
            <Shelf />
        </div>
    )
}