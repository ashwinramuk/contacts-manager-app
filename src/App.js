import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, createContext } from 'react'
import LogIn from './Component/LogIn/Login';
import SignUp from './Component/SignUp/signUp';
import TotalContact from "./Component/TotalContact/TotalContact"
import './App.css';
import ProtectedRoute from './Routes/ProtectedRoutes/ProtectedRoutes';
export const contextProvider = createContext();

function App() {
  const [contactsArr, setContactsArr] = useState([]);
  return (
    <>
      <contextProvider.Provider value={[contactsArr, setContactsArr]}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LogIn />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/dashBoard' element={<TotalContact />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </contextProvider.Provider>
    </>
  );
}

export default App;
