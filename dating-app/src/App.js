import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';
import HomePage from './Pages/HomePage.js';
import Test from './Pages/Recommendations.js';

function App() {
  const [toChild, setToChild] = useState([]);

  const getUserFromChild = (childProps) => {
    setToChild({
      age: childProps.age,
      email: childProps.email,
      firstname: childProps.firstname,
      lastname: childProps.lastname,
      username: childProps.username,
      password: childProps.password,
      gender: childProps.gender
    })
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage user={getUserFromChild} userData={toChild} />} />
        <Route path='/register' element={<RegisterPage user={getUserFromChild} />} />
        <Route path='/home' element={<HomePage userData={toChild} />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
