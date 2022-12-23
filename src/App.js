import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, createContext } from 'react'
import LogIn from './Component/LogIn/Login';
import SignUp from './Component/SignUp/signUp';
import TotalContact from "./Component/TotalContact/TotalContact"
import './App.css';
export const contextProvider = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <contextProvider.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/dashBoard' element={<TotalContact/>} />
          </Routes>
        </BrowserRouter>
      </contextProvider.Provider>
    </>
  );
}

export default App;
