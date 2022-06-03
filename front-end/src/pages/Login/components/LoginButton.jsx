import React from 'react';
import PropTypes from 'prop-types';
import { LockClosedIcon } from '@heroicons/react/solid';

function LoginButton(props) {
  const { name, id, infoClassBtn, infoClassSpan, infoClassIcon } = props;
  return (
    <button
      type="submit"
      className={ infoClassBtn }
      id={ id }
    >
      <span className={ infoClassSpan }>
        <LockClosedIcon
          className={ infoClassIcon }
          aria-hidden="true"
        />
      </span>
      {name}
    </button>
  );
}

LoginButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClassBtn: PropTypes.string.isRequired,
  infoClassSpan: PropTypes.string.isRequired,
  infoClassIcon: PropTypes.string.isRequired,
};

export default LoginButton;
