const MenuItemCard = ({ menuItem_name, price, image_link }) => {
    return (
      <div className="menu-item-card">
        <button>
            <img src={image_link} alt={menuItem_name} className="menu-item-image" />
            <h3>{menuItem_name}</h3>
            <p>Price: ${price}</p>
        </button>
      </div>
    );
  }
  
  export default MenuItemCard;
  