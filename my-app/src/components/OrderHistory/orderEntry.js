import MenuItem from "./menuItem";

const OrderEntry = ({ order, menuItems, foodItems }) => {
  const orderedTime = new Date(order.ordered_time);
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
