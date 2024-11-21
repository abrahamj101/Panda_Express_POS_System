import logo from "../../images/panda-express-logo-1.svg";
import { Link } from "react-router-dom";


const HomeButton = () => {
    return (
        <div className="logo">
            <Link to="/">
            <img src={logo} alt="Panda Express Logo" />
            <h1 className="panda-name">Panda Express</h1>
            </Link>
        </div>
    )
}

export default HomeButton;