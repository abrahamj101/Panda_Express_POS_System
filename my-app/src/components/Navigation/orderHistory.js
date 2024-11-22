import { Link } from "react-router-dom";

const OrderHistory = () => {
  const x = true;
  return (
    <div>
      {x ? (
        <>
          <Link to="/order-history" className="header-buttons">
            <p>Order History</p>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderHistory;