import "../../styles/Cards.css"


const FoodItemCard = ({ foodItem_id, foodItem_name, image_link }) => {
    return (
      <div className="item-card">
        
            <img src={image_link} alt={foodItem_name} className="item-image" />
            <h3>{foodItem_name}</h3>
        
      </div>
    );
  }
  
  export default FoodItemCard;
  