import { Link } from "react-router-dom";

const MenuItemCard = ({ menuItem_name, price, image_link, foodItem_ids }) => {
    return (
      <div className="menu-item-card">
        <Link to="/food" state={{ foodItem_ids }}>
            <img src={image_link} alt={menuItem_name} className="menu-item-image" />
            <h3>{menuItem_name}</h3>
            <p>Price: ${price}</p>
        </Link>
      </div>
    );
  }
  
  export default MenuItemCard;
  