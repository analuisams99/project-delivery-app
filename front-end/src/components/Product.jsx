import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Product({ product, addToCart }) {
  const { id, name, urlImage, price, quantity } = product;
  const [quantities, setQuantities] = useState(quantity);

  const handleSumBtn = () => {
    setQuantities(quantities + 1);
    addToCart(id, quantities + 1);
  };

  const handleDeductBtn = () => {
    if (quantities > 0) {
      setQuantities(quantities - 1);
      addToCart(id, quantities - 1);
    }
  };

  const handleChangeQnt = ({ target }) => {
    setQuantities(+target.value);
    addToCart(id, +target.value);
  };

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <div key={ id } className="group relative">
      <div
        className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md
        overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
      >
        <img
          src={ urlImage }
          alt={ `${name} visual representation` }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 mb-2 flex justify-between">
        <h3
          className="text-md text-gray-700"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h3>
        <p
          className="text-md font-medium text-gray-700"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          <span className="text-sm font-normal text-gray-800">R$</span>
          {' '}
          {convertPrice((+price).toFixed(2))}
        </p>
      </div>
      <div className="flex justify-between items-end">
        <h3 className="text-sm text-gray-700">Unidades:</h3>
        <div className="flex justify-end">
          <button
            className="w-6 mr-6 px-2 border border-gray-300
            rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
            hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1
            focus:ring-gray-300"
            type="button"
            onClick={ handleDeductBtn }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="number"
            value={ quantities }
            onChange={ handleChangeQnt }
            min="0"
            className="px-1 w-10 bg-slate-200"
            data-testid={ `customer_products__input-card-quantities-${id}` }
          />
          <button
            className="w-6 px-2 border border-gray-300
            rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
            hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1
            focus:ring-gray-300"
            type="button"
            onClick={ handleSumBtn }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Product;
