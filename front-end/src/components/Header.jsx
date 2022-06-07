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
    <div
      className="bg-indigo-600 md:px-48 lg:py-6 lg:flex lg:items-center
        lg:justify-between"
    >
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {buttons.map((e) => (
          <span key={ e.name } className="sm:ml-3">
            <button
              type="button"
              data-testid={ e.dataId }
              className="inline-flex items-center px-4 py-2 border border-gray-300
              rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
              onClick={ () => handleClick(e.role) }
            >
              {e.name}
            </button>
          </span>
        ))}
      </div>
      <div className="mt-5 flex justify-center items-center lg:mt-0 lg:mr-4">
        <span className="sm:ml-3">
          <p
            className="text-md font-semibold leading-7 text-indigo-100 sm:text-lg
              sm:truncate md:mr-8"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {userName}
          </p>
        </span>
        <span className="sm:ml-3">
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300
              rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
            onClick={ checkoutButton }
          >
            Sair
          </button>
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    dataId: PropTypes.string,
  })).isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
