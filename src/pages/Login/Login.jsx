import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Login = () => {
    const {handleGoogleSignIn}= use(AuthContext)
    return (
      <div className="text-center ">
        <h1 className="text-5xl font-bold my-6">Login now!</h1>
        <div className="flex items-center justify-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
        <button className='btn' onClick={() => handleGoogleSignIn()}>Sign In With google</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;