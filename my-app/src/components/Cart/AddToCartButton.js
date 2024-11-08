import React from 'react'
import { useNavigate } from 'react-router-dom';


 const AddToCartButton = () => {
    const navigate = useNavigate();


  return (
    <button onClick={() => navigate(-1)}  className="button">
      Add To Cart
    </button>
  )
}


export default AddToCartButton