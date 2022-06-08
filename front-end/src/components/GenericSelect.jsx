import React from 'react';
import PropTypes from 'prop-types';

function GenericInput(props) {
  const { name, value, id, infoClass, onChange, optionsList } = props;
  return (
    <div>
      <select
        id={ id }
        data-testid={ id }
        name={ name }
        value={ value }
        required
        className={ infoClass }
        onChange={ onChange }
      >
        <option value={ 0 }>Selecione um vendedor</option>
        { optionsList
          .map((o) => (
            <option key={ o.id } value={ o.id }>
              { o.name }
            </option>)) }
      </select>
    </div>
  );
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  optionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

export default GenericInput;
