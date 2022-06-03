import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import GenericInput from '../../components/GenericInput';
import GenericButton from '../../components/GenericButton';
import { postLogin } from '../../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleLoginClick = async () => {
    const response = await postLogin({ email, password });
    if (!response.token) {
      setErrorMessage(true);
      return 'fail';
    }
    localStorage.setItem('token', response.token);
    navigate('/customer/products');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
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
            Delivery App
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <GenericInput
              id="common_login__input-email"
              name="email"
              type="email"
              label="Email address"
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Email"
              onChange={ handleChangeEmail }
            />
            <GenericInput
              id="common_login__input-password"
              name="password"
              type="password"
              label="Password"
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
              name="Login"
              id="common_login__button-login"
              infoClassBtn="group relative w-full my-2 flex justify-center py-2 px-4
              border border-transparent text-sm font-medium rounded-md text-white
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500"
              infoClassSpan="absolute left-0 inset-y-0 flex items-center pl-3"
              infoClassIcon="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              onClick={ handleLoginClick }
            />
            <GenericButton
              name="Criar conta"
              id="common_login__button-register"
              infoClassBtn="group relative w-full flex justify-center py-2 px-4 border
              border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
              infoClassSpan=""
              infoClassIcon=""
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
                  data-testid="common_login__element-invalid-email"
                  className="text-amber-800 text-sm font-medium"
                >
                  Login ou Senha inválidos
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
