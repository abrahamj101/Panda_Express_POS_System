// Header.js
import CartIcon from "../Cart/CartIcon.js";
import CartModal from "../Modal/CartModal.js";
import "../../styles/Header.css";
import AuthButton from "./AuthButton.js";
import HomeButton from "./homeButton.js";

function Header() {

  return (
    <header className="header">
      <HomeButton />
      <h1 className="panda-name">Panda Express</h1>
      <div className="header-buttons">
        <CartIcon />
        <CartModal />
        <AuthButton />
      </div>
    </header>
  );
}

export default Header;
