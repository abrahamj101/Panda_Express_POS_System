// Header.js
import CartIcon from "../Cart/CartIcon.js";
import CartModal from "../Cart/CartModal.js";
import "../../styles/Header.css";
import AuthButton from "../Login/AuthButton.js";
import HomeButton from "./homeButton.js";
import OrderHistory from "./orderHistory.js";
import ManagerButton from "./ManagerButton.js";
import LoginContext from "../Login/LoginContext.js";
import { useContext } from "react";

function Header() {
  const { isLoggedIn, role } = useContext(LoginContext);

  return (
    <header className="header">
      <HomeButton />
      <div className="header-buttons">
        {isLoggedIn ? (
          role === "manager" || role === "admin" ? (
            <ManagerButton />
          ) : (
            <OrderHistory />
          )
        ) : (
          <></>
        )}

        <div></div>
        <div></div>
        <div></div>
        <CartIcon />
        <CartModal />
        <AuthButton />
      </div>
    </header>
  );
}


export default Header;