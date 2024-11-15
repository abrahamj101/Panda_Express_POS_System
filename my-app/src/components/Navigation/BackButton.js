import { Link, useNavigate } from 'react-router-dom';

const BackButton = ({location}) => {
  const navigate = useNavigate();

  return (
    <Link to={location} style={{ textDecoration: 'none' }}>
      <button className="button">
        Go Back
      </button>
    </Link>
  );
}

export default BackButton;
