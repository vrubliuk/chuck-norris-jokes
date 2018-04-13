import React from 'react'
import './Form.css'

const form = (props) => {

  return (
    <div className="Form" >
        <input type="text" name="quantity" min="1" max="10" value={props.jokesQuantity} onChange={props.setJokesQuantity} />
        <button onClick={props.getJokes}><i className="fa fa-refresh" aria-hidden="true"></i></button>
    </div>
  )
}

export default form