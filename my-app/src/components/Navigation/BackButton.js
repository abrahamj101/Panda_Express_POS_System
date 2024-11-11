import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}  className="button">
      Go Back
    </button>
  );
}

export default BackButton;
