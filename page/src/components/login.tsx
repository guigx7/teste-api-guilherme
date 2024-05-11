
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";

export function Login() {

  const navigate = useNavigate();

  const { setUsername } = useUser();

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
      
      alert("USUÁRIO LOGADO COM SUCESSO");
      setUsername(formData.username);
      navigate("/logged");
    } catch (error) {
      console.error('Error registering:', error);
      alert("USUÁRIO OU SENHA INCORRETOS");
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
          </div>
        </form>
      </div>
    </div>
  )
}