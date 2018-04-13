import React from 'react'
import './Category.css'

let category = (props) => {
  let classes = props.children === props.currentCategory ? 'Category Category-active' : 'Category'
  
  return (
    <div className={classes} onClick={props.setCategory}>
      <div>{props.children.charAt(0).toUpperCase() + props.children.slice(1)}</div>
    </div>
  )}

export default category
