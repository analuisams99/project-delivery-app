import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import GenericInput from '../../components/GenericInput';
import GenericButton from '../../components/GenericButton';
import { postRegister } from '../../services/api';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyInput = (emailC, passwordC, nameC) => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(emailC);
    const passwordMinLength = 5;
    const nameMinLength = 12;
    if (emailVerified && passwordC.length > passwordMinLength
      && nameC.length >= nameMinLength) {
      setBtnIsDisabled(false);
      return console.log('entrou');
    }
    setBtnIsDisabled(true);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput(target.value, password, name);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput(email, target.value, name);
  };

  const handleChangeName = ({ target }) => {
    setName(target.value);
    verifyInput(email, password, target.value);
  };

  const handleRegisterClick = async () => {
    const response = await postRegister({ name, email, password });
    if (!response.token) {
      setErrorMessage(true);
      return 'fail';
    }
    localStorage.setItem('user', JSON.stringify(response));
    navigate('/customer/products');
  };

  return (
    <div
      className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-32 w-auto"
            src={ logo }
            alt="Workflow"
          />
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            Cadastro
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <GenericInput
              id="common_register__input-name"
              name="name"
              type="text"
              value={ name }
              label="Name"
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Nome"
              onChange={ handleChangeName }
            />
            <GenericInput
              id="common_register__input-email"
              name="email"
              type="email"
              label="Email address"
              value={ email }
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Email"
              onChange={ handleChangeEmail }
            />
            <GenericInput
              id="common_register__input-password"
              name="password"
              type="password"
              label="Password"
              value={ password }
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Senha"
              onChange={ handleChangePassword }
            />
          </div>
          <div>
            <GenericButton
              name="Cadastrar"
              id="common_register__button-register"
              infoClassBtn="group relative w-full my-2 h-12 flex justify-center py-3 px-4
              border border-transparent text-sm font-medium rounded-md text-white
              bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              infoClassSpan="absolute left-0 inset-y-0 flex items-center pl-3"
              infoClassIcon="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              disabled={ btnIsDisabled }
              onClick={ handleRegisterClick }
            />
          </div>
          <div className="flex justify-center items-center">
            {errorMessage
            && (
              <div
                className="w-1/2 text-center border-2 rounded-md border-amber-800 py-2"
              >
                <p
                  data-testid="common_register__element-invalid_register"
                  className="text-amber-800 text-sm font-medium"
                >
                  Dados em formato inválido
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
