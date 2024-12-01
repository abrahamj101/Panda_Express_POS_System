import { Link } from 'react-router-dom';

const BackButton = ({location}) => {

  return (
    <Link to={location} style={{ textDecoration: 'none' }}>
      <button className="button">
        Go Back
      </button>
    </Link>
  );
}

export default BackButton;
