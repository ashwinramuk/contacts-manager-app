import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
// import './App.css';

import LoginPage from './Component/LogIn/loginpage';
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
