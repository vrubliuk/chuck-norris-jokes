import React from 'react'
import './Joke.css'

const joke = (props) => {
  return <div className="Joke">
    <span>
    {props.children}
    </span>
  
  </div>
}

export default joke