import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from './GenericInput';
import GenericButton from './GenericButton';
import GenericSelect from './GenericSelect';

function FormCheckout({
  seller,
  setSeller,
  address,
  setAddress,
  houseNum,
  setHouseNum,
  sellers,
  handleSubmitBtn,
}) {
  const handleChangeSeller = ({ target }) => {
    setSeller(target.value);
  };

  const handleChangeAddress = ({ target }) => {
    setAddress(target.value);
  };

  const handleChangeHouseNum = ({ target }) => {
    setHouseNum(target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
      >
        Detalhes e Endereço para Entrega
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <p>Vendedor Responsável</p>
          <GenericSelect
            id="customer_checkout__select-seller"
            name="seller"
            label="Seller"
            value={ seller }
            infoClass="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            onChange={ handleChangeSeller }
            optionsList={ sellers }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Endereço</p>
          <GenericInput
            id="customer_checkout__input-address"
            name="address"
            type="text"
            label="Address"
            value={ address }
            infoClass="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            placeholder="Endereço"
            onChange={ handleChangeAddress }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Número</p>
          <input
            type="number"
            value={ houseNum }
            onChange={ handleChangeHouseNum }
            min="0"
            className="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            data-testid="customer_checkout__input-addressNumber"
          />
        </div>
      </div>
      <GenericButton
        name="Finalizar Pedido"
        id="customer_checkout__button-submit-order"
        infoClassBtn="group relative w-full my-2 h-12 flex justify-center py-3 px-4
        border border-transparent text-sm font-medium rounded-md text-white
        bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700 focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={ handleSubmitBtn }
        disabled={ false }
      />
    </div>
  );
}

FormCheckout.propTypes = {
  seller: PropTypes.number.isRequired,
  setSeller: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  // houseNum: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]).isRequired,
  houseNum: PropTypes.string.isRequired,
  setHouseNum: PropTypes.func.isRequired,
  handleSubmitBtn: PropTypes.func.isRequired,
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

export default FormCheckout;
