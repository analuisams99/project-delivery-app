import React from 'react';
import PropTypes from 'prop-types';
// import { LockClosedIcon } from '@heroicons/react/solid';

function GenericButton(props) {
  const { name, id, infoClassBtn, onClick } = props;
  return (
    <button
      type="submit"
      className={ infoClassBtn }
      id={ id }
      data-testid={ id }
      onClick={ onClick }
    >
      {/* <span className={ infoClassSpan }>
        <LockClosedIcon
          className={ infoClassIcon }
          aria-hidden="true"
        />
      </span> */}
      {name}
    </button>
  );
}

GenericButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClassBtn: PropTypes.string.isRequired,
  // infoClassSpan: PropTypes.string.isRequired,
  // infoClassIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenericButton;
