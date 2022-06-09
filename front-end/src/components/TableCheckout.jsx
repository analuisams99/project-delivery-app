import PropTypes from 'prop-types';
import React from 'react';

export default function TableCheckout({ orders, removeProduct }) {
  const dataId = 'customer_checkout__element-order-table-item-number-';
  const dataPrice = 'customer_checkout__element-order-table-unit-price-';

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          {
            (orders).map((e, index) => (
              <tr key={ e.id }>
                <td
                  data-testid={ `${dataId}${index}` }
                >
                  { index + 1 }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { e.name }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { e.quantity }

                </td>
                <td
                  data-testid={ `${dataPrice}${index}` }
                >
                  { convertPrice((+e.price).toFixed(2)) }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { convertPrice((e.quantity * +e.price).toFixed(2)) }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  <button type="button" id={ e.id } onClick={ removeProduct }>
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TableCheckout.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  removeProduct: PropTypes.func.isRequired,
};
