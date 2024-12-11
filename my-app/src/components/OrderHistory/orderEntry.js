import MenuItem from "./menuItem";

/**
 * OrderEntry component displays details of a single order and its associated menu items.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.order - The order object containing order details such as ordered time, total, tax, and menu item IDs.
 * @param {Array} props.menuItems - Array of menu item objects used to find specific menu item details.
 * @param {Array} props.foodItems - Array of food item objects used to find associated food items for the menu items.
 * @returns {JSX.Element} The rendered OrderEntry component.
 */
const OrderEntry = ({ order, menuItems, foodItems }) => {
  // Create a Date object from the order's ordered time.
  /** @type {Date} */
  const orderedTime = new Date(order.ordered_time);

  // Options for formatting the date to a localized string in CST.
  /** @type {Object} */
  const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/Chicago",
  };
  // Format the ordered time as a string with the defined options.
  /** @type {string} */
  const formattedTime = orderedTime.toLocaleString("en-US", options);

  return (
      <div className="order-entry">
          <p className="order-time">{`${formattedTime} - $${(parseFloat(order.total) + parseFloat(order.tax)).toFixed(2)}`}</p>
          <div className="order-items">
              {order.menuitem_ids?.length > 0 ? (
                  order.menuitem_ids.map((menuItemId, index) => (
                      <MenuItem
                          key={index}
                          menuItems={menuItems}
                          menuItemId={menuItemId}
                          foodItems={foodItems}
                          foodItemIds={order.fooditem_ids?.[index] || []}
                      />
                  ))
              ) : (
                  <p></p>
              )}
          </div>
      </div>
  );
};

export default OrderEntry;
