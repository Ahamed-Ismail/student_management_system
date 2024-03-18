import './App.css';
import { BrowserRoute, Route, Routes } from 'react-router-dom';
import AdminLoginPage from './Components/AdminLoginPage';
import HomePage from './Components/HomePage';
import UserLoginPage from './Components/UserLoginPage';
import AdminHomePage from './Components/AdminHomePage';
import UserHomePage from './Components/UserHomePage';
import Qrread from './Components/Qrread';
import Qrcode from './Components/Qrcode';


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='/adminlogin' element={<AdminLoginPage />} />

      <Route path='/userlogin' element={<UserLoginPage />} />

      <Route path='/adminhomepage' element={<AdminHomePage />} />
      
      <Route path='/userhomepage' element={<UserHomePage />} />
      
      <Route path='/qrcode' element={<Qrcode />} />

      <Route path='/qrread' element={<Qrread />} />
      
      
    </Routes>
  );
}

export default App;
