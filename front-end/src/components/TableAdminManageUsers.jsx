import PropTypes from 'prop-types';
import React from 'react';

export default function TableAdminManageUsers({ users, removeUser }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            (users).map(({ id, name, email, role }, index) => (
              <tr key={ id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { name }
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  { email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-<index>${index}` }
                >
                  { role }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  <button type="button" id={ id } onClick={ () => removeUser(id, role) }>
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

TableAdminManageUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  removeUser: PropTypes.func.isRequired,
};
