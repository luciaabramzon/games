import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Hangman from './Games/Hangman';
import RPS from './Games/RPS';
import LoginForm from './LoginForm';

const Rout=()=>{
return(
  <BrowserRouter>
  <Routes>
    <Route exact path='/' element={<LoginForm/>}/>
    <Route exact path='/dashboard' element={<Dashboard/>}/>
    <Route exact path='/rps' element={<RPS/>}/>
    <Route exact path='hangman'element={<Hangman/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default Rout