import "../../styles/Cards.css"


const FoodItemCard = ({ foodItem_name, image_link, premium }) => {
    return (
      <div className="item-card">
        
            <img src={image_link} alt={foodItem_name} className="item-image" />
            <h3>{foodItem_name}</h3>
            {premium ? <h3 className="premium">Premium Entree</h3> : <></>}
      </div>
    );
  }
  
  export default FoodItemCard;
  