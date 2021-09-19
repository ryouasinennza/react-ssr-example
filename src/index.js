import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.getElementById('root')
console.log(JSON.parse(root.dataset.props))
ReactDOM.hydrate(<App {...JSON.parse(root.dataset.props)} />, document.getElementById('root'))
