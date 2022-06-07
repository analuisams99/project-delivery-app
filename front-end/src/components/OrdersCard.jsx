import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrdersCard({ orders, role }) {
  const navigate = useNavigate();

  const handleClick = (rota, id) => navigate(`/${rota}/orders/${id}`);

  const handleDate = (saleDate) => {
    const dataAmericana = saleDate.split('T', 1).toString();
    const dataBrasileira = dataAmericana.split('-').reverse().join('/');
    return dataBrasileira;
  };

  return (
    <div>
      {orders.map(
        ({ id, deliveryAddress, deliveryNumber, saleDate, status, totalPrice }) => (
          <button key={ id } type="button" onClick={ () => handleClick(role, id) }>
            <p>Pedido</p>
            <p data-testid={ `${role}_orders__element-order-id-${id}` }>
              {deliveryNumber}
            </p>
            <p data-testid={ `${role}_orders__element-delivery-status-${id}` }>
              {status}
            </p>
            <p data-testid={ `${role}_orders__element-order-date-${id}` }>
              {handleDate(saleDate)}
            </p>
            <p data-testid={ `${role}_orders__element-card-price-${id}` }>
              { totalPrice }
            </p>
            {
              role === 'seller'
                ? (
                  <p
                    data-testid={ `${role}_orders__element-card-address-${id}` }
                  >
                    { deliveryAddress }
                  </p>
                )
                : null
            }
          </button>
        ),
      )}
    </div>
  );
}

OrdersCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  })).isRequired,
  role: PropTypes.string.isRequired,
};

export default OrdersCard;
