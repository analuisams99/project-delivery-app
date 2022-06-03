import React from 'react';
import logo from '../../images/logo.svg';
import LoginInput from './components/LoginInput';
import LoginButton from './components/LoginButton';

function Login() {
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
            <LoginInput
              id="email-address"
              name="email"
              type="email"
              label="Email address"
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Email"
            />
            <LoginInput
              id="password"
              name="password"
              type="password"
              label="Password"
              infoClass="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
          </div>
          <div>
            <LoginButton
              name="Login"
              id="login-button"
              infoClassBtn="group relative w-full my-4 flex justify-center py-2 px-4
              border border-transparent text-sm font-medium rounded-md text-white
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500"
              infoClassSpan="absolute left-0 inset-y-0 flex items-center pl-3"
              infoClassIcon="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            />
            <LoginButton
              name="Criar conta"
              id="register-button"
              infoClassBtn="group relative w-full flex justify-center py-2 px-4 border
              border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
              infoClassSpan=""
              infoClassIcon=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
