import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";


export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [repeatPassword, setRepeatPassword] = useState(''); // 1. Estado separado para a senha repetida

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'repeatPassword') { // 2. Verifica se é o campo de senha repetida
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
      alert("As senhas não coincidem");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      console.log(response.data);
      alert("USUÁRIO REGISTRADO COM SUCESSO");
      navigate("/login");
    } catch (error) {
      console.error('Error registering:', error);
      alert("ERRO AO REGISTRAR USUÁRIO");
    }
  };

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
          </div>
        </form>
      </div>
    </div>
  )
}
