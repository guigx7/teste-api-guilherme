import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

export function Register() {

    const passwordsDontMatchToast = () => toast.error("Passwords don't match", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });

      const registerSuccessToast = () => toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });

        const registerErrorToast = () => toast.error("Username or email already in use", {
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
    email: '',
    password: ''
  });

  const [repeatPassword, setRepeatPassword] = useState(''); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'repeatPassword') { 
      setRepeatPassword(e.target.value);
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== repeatPassword) { // 3. Validar se as senhas coincidem
      // alert("Passwords don't match");
      passwordsDontMatchToast();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      console.log(response.data);
      // alert("User registered successfully");
      registerSuccessToast();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      // alert("Username or Email already in use");
      registerErrorToast();
    }
  };

  useEffect(() => {
    document.title = "Teste Threeo - Register";
  })

  return (
    <div className="flex items-center justify-center min-h-[100dvh] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Register</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" required type="text" onChange={handleChange}/>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" required type="email" onChange={handleChange}/>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" required type="password" onChange={handleChange}/>
          </div>
          <div>
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input id="repeatPassword" placeholder="Repeat your password" required type="password" onChange={handleChange}/>
          </div>
          <Button className="w-full" type="submit">
            Register
          </Button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <span>Already have an account? </span>
            <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" to={'/login'}>
              Login
            </Link>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  )
}
