import { Link } from "react-router-dom";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";

const OrderHistory = () => {
  const {isLoggedIn} = useContext(LoginContext)
  return (
    <div>
      {isLoggedIn ? (
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