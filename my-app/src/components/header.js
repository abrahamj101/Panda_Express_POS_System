import logo from "../images/panda-express-logo-1.svg";


const Header = () => {
    return (
        <header className="header">
        <div className="logo">
          <img src={logo} alt="Panda Express Logo" />
        </div>
        <h1>Panda Express</h1>
        <button className="login-btn">Login</button>
      </header>
    );
};

export default Header;