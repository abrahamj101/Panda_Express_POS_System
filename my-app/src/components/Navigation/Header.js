// Header.js
import CartIcon from "../Cart/CartIcon.js";
import CartModal from "../Cart/CartModal.js";
import "../../styles/Header.css";
import AuthButton from "../Login/AuthButton.js";
import HomeButton from "./homeButton.js";
import OrderHistory from "./orderHistory.js";
import ManagerButton from "./ManagerButton.js";

function Header() {

  return (
    <header className="header">
      <HomeButton />
      <div className="header-buttons">
        {/* <OrderHistory/> */}
        <ManagerButton/>
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