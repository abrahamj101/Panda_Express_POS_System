import { Link } from "react-router-dom";
import "../../styles/Cards.css";
import MenuItem from "./MenuItemClass"

const MenuItemCard = ({ menuItem_name, price, image_link, foodItem_ids, menuItem_id }) => {
    const menuItemObject = new MenuItem(menuItem_id, menuItem_name);
    
    return (
      <div className="item-card">
        <Link
          to="/food"
          state={{
            foodItem_ids,
            menuItem_id,
            menuItem_name,
          }}
        >
          <img src={image_link} alt={menuItem_name} className="item-image" />
          <h3>{menuItem_name}</h3>
          <p>Price: ${price}</p>
        </Link>
      </div>
    );
};

export default MenuItemCard;
