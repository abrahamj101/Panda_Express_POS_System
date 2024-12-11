import { Link } from "react-router-dom";
import "../../styles/FoodandMenu/Cards.css";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";

const MenuItemCard = ({ menuItem_name, price, image_link, foodItem_ids, menuItem_id, inventoryItemIds, inStock }) => {
  const {isLoggedIn, role} = useContext(LoginContext);
    
    return (
      <div className="item-card">
        <Link
          to="/food"
          state={{
            foodItem_ids,
            menuItem_id,
            menuItem_name,
            price,
            image_link,
            inventoryItemIds, 
            inStock,
          }}
        >
          {!isLoggedIn || isLoggedIn && role === "customer" ? (
            <img src={image_link} alt={menuItem_name} className="item-image" />
          ) : (
            <></>
          )}
          
          <p className="name">{menuItem_name}</p>
          <p>Price: ${price}</p>
        </Link>
      </div>
    );
};

export default MenuItemCard;