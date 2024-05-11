import {Register} from './components/register'
import {Login} from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

