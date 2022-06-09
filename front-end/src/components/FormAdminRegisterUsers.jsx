import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from './GenericInput';
import GenericButton from './GenericButton';

function FormAdminRegisterUsers({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  handleSubmitBtn,
  btnIsDisabled,
  setBtnIsDisabled,
}) {
  const verifyInput = (emailC, passwordC, nameC, roleC) => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(emailC);
    const passwordMinLength = 6;
    const nameMinLength = 12;
    if (emailVerified && passwordC.length >= passwordMinLength
      && nameC.length >= nameMinLength && roleC !== 'Selecione') {
      setBtnIsDisabled(false);
      return console.log('Cadastrou');
    }
    setBtnIsDisabled(true);
  };

  const handleChangeName = ({ target }) => {
    setName(target.value);
    verifyInput(email, password, target.value, role);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput(target.value, password, name, role);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput(email, target.value, name, role);
  };

  const handleChangeRoles = ({ target }) => {
    setRole(target.value);
    verifyInput(email, password, name, target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
      >
        Cadastrar novo usuário
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <p>Nome</p>
          <GenericInput
            id="admin_manage__input-name"
            name="name"
            type="text"
            label="Name"
            value={ name }
            infoClass="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            placeholder="Nome e Sobrenome"
            onChange={ handleChangeName }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Email</p>
          <GenericInput
            id="admin_manage__input-email"
            name="email"
            type="email"
            label="Email"
            value={ email }
            infoClass="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            placeholder="seu-email@mail.com"
            onChange={ handleChangeEmail }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Senha</p>
          <GenericInput
            id="admin_manage__input-password"
            name="senha"
            type="password"
            label="Senha"
            value={ password }
            infoClass="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            placeholder="*******"
            onChange={ handleChangePassword }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Tipo</p>
          <select
            data-testid="admin_manage__select-role"
            name="role"
            label="Role"
            value={ role }
            defaultValue="Selecione"
            className="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            onChange={ handleChangeRoles }
          >
            <option value="Selecione" disabled>
              Selecione
            </option>
            <option value="seller">
              Vendedor
            </option>
            <option value="customer">
              Cliente
            </option>
          </select>
        </div>
      </div>
      <GenericButton
        name="Cadastrar"
        id="admin_manage__button-register"
        infoClassBtn="group relative w-full my-2 h-12 flex justify-center py-3 px-4
        border border-transparent text-sm font-medium rounded-md text-white
        bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700 focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={ handleSubmitBtn }
        disabled={ btnIsDisabled }
      />
    </div>
  );
}

FormAdminRegisterUsers.propTypes = {
  btnIsDisabled: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  handleSubmitBtn: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setBtnIsDisabled: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default FormAdminRegisterUsers;
