import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ buttons, userName }) {
  const navigate = useNavigate();

  const checkoutButton = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClick = (rota) => navigate(`/${rota}`);

  return (
    <div>
      {buttons.map((e) => (
        <button
          type="button"
          key={ e.name }
          data-testid={ e.testId }
          onClick={ () => handleClick(e.role) }
        >
          {e.name}
        </button>
      ))}
      <p data-testid="customer_products__element-navbar-user-full-name">{userName}</p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ checkoutButton }
      >
        Sair
      </button>
    </div>
  );
}

Header.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    testId: PropTypes.string,
  })).isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
