import React from 'react';
import PropTypes from 'prop-types';

function GenericInput(props) {
  const { name, type, value, label, id, infoClass, placeholder, onChange } = props;
  return (
    <div>
      <label htmlFor={ id } className="sr-only">
        {label}
      </label>
      <input
        id={ id }
        data-testid={ id }
        name={ name }
        type={ type }
        value={ value }
        autoComplete={ name }
        required
        className={ infoClass }
        placeholder={ placeholder }
        onChange={ onChange }
      />
    </div>
  );
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenericInput;
