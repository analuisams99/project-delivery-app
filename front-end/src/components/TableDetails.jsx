import React from 'react';
import PropTypes from 'prop-types';

export default function TableDetails({ orders, role }) {
  const fId = 'customer_order_details__element-order-table-item-number-';
  const dataPrice = 'customer_order_details__element-order-table-sub-total-';

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
          </tr>
        </thead>
        <tbody>
          {
            (orders).map((e, i) => (
              <tr key={ e.id }>
                <td
                  data-testid={ `${fId}${i}` }
                >
                  { i + 1 }

                </td>
                <td
                  data-testid={ `${role}_order_details__element-order-table-name-${i}` }
                >
                  { e.name }

                </td>
                <td
                  data-testid={
                    `${role}_order_details__element-order-table-quantity-${i}`
                  }
                >
                  { e.SaleProduct.quantity }

                </td>
                <td
                  data-testid={ `${dataPrice}${i}` }
                >
                  { convertPrice((+e.price).toFixed(2)) }

                </td>
                <td
                  data-testid={
                    `${role}_order_details__element-order-total-price-${i}`
                  }
                >
                  { convertPrice((e.SaleProduct.quantity * +e.price).toFixed(2)) }

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TableDetails.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })).isRequired,
  role: PropTypes.string.isRequired,
};
