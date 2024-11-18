import React from 'react'
import { Link } from 'react-router-dom';


 const AddToCartButton = ({onClick}) => {


  return (
    <Link to="/menu" style={{ textDecoration: 'none' }}>
      <button onClick={ onClick }  className="button">
        Add To Cart
      </button>
    </Link>
  )
}


export default AddToCartButton