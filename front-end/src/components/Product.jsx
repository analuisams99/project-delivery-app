import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Product({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, urlImage, price } = product;

  const handleSumBtn = () => {
    setQuantity(quantity + 1);
  };

  const handleDeductBtn = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
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
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {name}
          </h3>
          <div className="flex">
            <button
              className="mx-2 px-2 border border-transparent text-sm font-medium
              rounded-md text-white bg-indigo-600 disabled:bg-indigo-400
              hover:bg-indigo-700"
              type="button"
              onClick={ handleDeductBtn }
            >
              -
            </button>
            <p className="px-1">{quantity}</p>
            <button
              className="mx-2 px-2 border border-transparent text-sm font-medium
              rounded-md text-white bg-indigo-600 disabled:bg-indigo-400
              hover:bg-indigo-700"
              type="button"
              onClick={ handleSumBtn }
            >
              +
            </button>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {+Math.round(price).toFixed(2)}
        </p>
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
};

export default Product;
