import { Link } from "react-router-dom";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";

const ManagerButton = () => {
  const {isLoggedIn} = useContext(LoginContext)
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Link to="/Manager" className="header-buttons">
            <p>Manager</p>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManagerButton;