import React from 'react'
import './Form.css'

const form = (props) => {
  let tooltipText = 'Pick a number between 1 and 10'

  return (
    <form className="Form">
      <div className="Form__tooltip">
        <input type="text" value={props.jokesQuantity} onChange={props.setJokesQuantity} />
        {props.showTooltip ? <span className="Form__tooltip__text">{tooltipText}</span> : null}
      </div>
      <button onClick={props.getJokes}><i className="fa fa-refresh" aria-hidden="true" ></i></button>
    </form>
  )
}

export default form