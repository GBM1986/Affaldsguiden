import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../providers/AuthProvider'; // Ensure this import path is correct

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin, loginData } = useAuth(); // Destructure handleLogin and loginData from useAuth
  const [loginMessage, setLoginMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      await handleLogin(data.email, data.password);
      if (loginData && loginData.user) {
        setLoginMessage(`Welcome back, ${loginData.user.email}!`);
      } else {
        setLoginMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed. Please try again.');
    }
  };

  // Check if the user is logged in
  const isLoggedIn = loginData && loginData.user;

  return (
    <div className='bg-gradient-to-b from-natur to-white'>
        <div className="h-screen bg-gradient-to-b from-lightGreen to-white w-[1440px] mx-auto p-10">
      {!isLoggedIn ? (
        <>
          <h2 className="text-heading-2 font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[490px] space-y-4">
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="border px-3 py-2 rounded-md w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="border px-3 py-2 rounded-md w-full"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className='flex justify-end mt-4'>
                <button
                  type="submit"
                  className="bg-forrestGreen text-white px-4 py-2 rounded-md hover:bg-deepGreen"
                >
                  Login
                </button>
              </div>
          </form>
          <div className='flex flex-col space-y-2 mt-20' > 
            <a ahref="#" className='text-forrestGreen hover:text-deepGreen cursor-pointer  underline'>Opret ny bruger</a>
            <a ahref="#" className='text-forrestGreen hover:text-deepGreen cursor-pointer underline'>Glemt password?</a>
          </div>
        </>
      ) : (
        <div className='max-w-md mx-auto'>
          <p className='mt-4 p-2 border rounded-md bg-green-100 text-green-800'>{loginMessage}</p>
        </div>
      )}
      </div>
    </div>
  );
};
