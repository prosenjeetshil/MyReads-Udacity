import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// BrowserRouter is imported 
ReactDOM.render(
<BrowserRouter>
        {/* func App is wrapped into BrowserRouter */}
        <App />
</BrowserRouter>, document.getElementById('root'))