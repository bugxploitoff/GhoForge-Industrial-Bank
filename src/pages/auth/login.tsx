import React, { useState } from 'react'
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
    const currentYear = new Date().getFullYear();
    const [button, setButton] = useState('Sign with email');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setButtonDisabled(true);
      setButton("Connecting to server ...");
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.email,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
  
          toast.success('Account login successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: 'light',
          });
  
          setButton("Access granted");
          
          window.location.href = '/dashboard';
  
          // Redirect to another page, if needed
          // Example: router.push('/dashboard');
        } else {
          toast.error('Invalid credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: 'light',
          });
  
          setButton("Bad credentials");
        }
      } catch (error) {
        console.error('Error during login API call:', error);
  
        toast.error('An error occurred. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: 'light',
        });
      } finally {
        setButtonDisabled(false);
      }
    };
          
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
        html, body{
          font-family: 'Roboto', sans-serif;
        }
        .break-inside {
          -moz-column-break-inside: avoid;
          break-inside: avoid;
        }
        body {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          min-height: 100vh;
          line-height: 1.5;
        }
      `,
        }}
      />
      {/* Example */}
      <div className="flex min-h-screen">
        {/* Container */}
        <div className="flex flex-row w-full">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-8 h-8" />
              <a href="/" className="font-medium text-xl">
                SBT
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
                Enter your account and discover new experiences
              </h1>
              <p className="text-lg">Don't have an account?</p>
              <a href="/auth/register">
                <button className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                  Get Your wallet
                </button>
              </a>
            </div>
            <p className="font-medium">©{currentYear} LFGHO</p>
          </div>
          {/* Login */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            <div className="flex lg:hidden justify-between items-center w-full py-4">
              <div className="flex items-center justify-start space-x-3">
                <span className="bg-black rounded-full w-6 h-6" />
                <a href="#" className="font-medium text-lg">
                  SBT
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>Not a member? </span>
                <a
                  href="/auth/register"
                  className="underline font-medium text-[#070eff]"
                >
                  signup
                </a>
              </div>
            </div>
            {/* Login box */}
            <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
              <ToastContainer />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Sign In to account
                </h2>
                <p className="text-md md:text-xl">
                  Sign In or log in to place the order, no password require!
                </p>
              </div>
              <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col max-w-md space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
          />
          <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white" disabled={isButtonDisabled}>
            {button}
          </button>
        </div>
      </form>
            </div>
            {/* Footer */}
            <div className="flex justify-center flex-col m-auto mb-16 text-center text-lg dark:text-slate-600 ">
              <p className="font-bold mb-1">Built by Bugxploit</p>
            </div>
          </div>
        </div>
      </div>
      {/* Example */}
    </>
  )
}

export default login