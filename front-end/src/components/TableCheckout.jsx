import PropTypes from 'prop-types';
import React from 'react';

export default function TableCheckout({ orders }) {
  const dataId = 'customer_checkout__element-order-table-item-number-';
  const dataPrice = 'customer_checkout__element-order-table-unit-price-';
  return (
    <div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover item</th>
        </tr>
        {
          (orders).map((e) => (
            <tr key={ e.id }>
              <td
                data-testid={ `${dataId}${e.id}` }
              >
                { e.id }

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${e.id}` }
              >
                { e.name }

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${e.id}` }
              >
                { e.quantity }

              </td>
              <td
                data-testid={ `${dataPrice}${e.id}` }
              >
                { e.price }

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${e.id}` }
              >
                { e.quantity * +e.price }

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${e.id}` }
              >
                <button type="button" onClick={ removeProduct }>
                  Remover
                </button>
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

TableCheckout.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};
