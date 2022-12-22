import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
// import './App.css';

import LoginPage from './Component/LogIn/loginpage';
import TotalContact from './Component/TotalContact/TotalContact'
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/contacts' element={<TotalContact/>}/>            
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
