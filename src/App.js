import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import BookSearch from './Pages/BookSearch'
import './App.css'

//function App 
export default function App() {
      return (
        <div className="app">
            {/* Router is used for page routing */}
            <Route exact path="/" component={ Home }/> 
            <Route path="/search" component={ BookSearch }/>
        </div>
      )
}