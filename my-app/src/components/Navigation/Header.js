import logo from "../../images/panda-express-logo-1.svg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


const Header = () => {
    return (
        <header className="header">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Panda Express Logo" />
            </div>
          </Link>
        <h1>Panda Express</h1>
        <button className="login-btn">Login</button>
      </header>
    );
};

export default Header;