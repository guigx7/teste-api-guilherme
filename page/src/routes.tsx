import {Register} from './components/register'
import {Login} from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Logged } from './components/logged';
import { Error404 } from './components/ErrorPages/error404';
import { Error401 } from './components/ErrorPages/error401';


export const AppRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logged' element={<Logged/>}></Route>
        <Route path='/401' element={<Error401/>}></Route>
        <Route path='*' element={<Error404/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

