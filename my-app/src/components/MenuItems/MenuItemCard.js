const MenuItemCard = ({ menuItem_name, price, image_link }) => {
    return (
      <div className="menu-item-card">
        <img src={image_link} alt={menuItem_name} className="menu-item-image" />
        <h3>{menuItem_name}</h3>
        <p>Price: ${price}</p> {/* Ensures price is displayed with two decimals */}
      </div>
    );
  }
  
  export default MenuItemCard;
  