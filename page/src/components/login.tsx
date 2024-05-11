import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {

  const loginErrorToast = () => toast.error('Incorrect username or password', {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });

    const loginSuccessToast = () => toast.success('User logged in successfully', {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      console.log(response.data);
      document.cookie = `token=${response.data.token}; path=/;`;
      document.cookie = `username=${formData.username}; path=/;`;
      // alert("User logged in successfully");
      loginSuccessToast();
      setTimeout(() => {
        navigate("/logged"); 
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      // alert("Incorrect username or password");
      loginErrorToast();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Login</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" required type="text" onChange={handleChange}/>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" required type="password" onChange={handleChange}/>
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <span>Don't have an account? </span>
            <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" to={'/register'}>
              Register
            </Link>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  )
}