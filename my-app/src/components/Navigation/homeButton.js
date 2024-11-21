import logo from "../../images/panda-express-logo-1.svg";
import { Link } from "react-router-dom";


const HomeButton = () => {
    return (
        <div className="logo">
            <Link to="/">
            <img src={logo} alt="Panda Express Logo" />
            </Link>
        </div>
    )
}

export default HomeButton;