import React from 'react';
import PropTypes from 'prop-types';

function LoginInput(props) {
  const { name, type, label, id, infoClass, placeholder } = props;
  return (
    <div>
      <label htmlFor={ id } className="sr-only">
        {label}
      </label>
      <input
        id={ id }
        name={ name }
        type={ type }
        autoComplete={ name }
        required
        className={ infoClass }
        placeholder={ placeholder }
      />
    </div>
  );
}

LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default LoginInput;
