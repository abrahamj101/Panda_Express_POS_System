import { Link } from "react-router-dom";

const FoodItemCard = ({ foodItem_id, foodItem_name, image_link }) => {
    return (
      <div className="menu-item-card">
        
            <img src={image_link} alt={foodItem_name} className="menu-item-image" />
            <h3>{foodItem_name}</h3>
        
      </div>
    );
  }
  
  export default FoodItemCard;
  