import React from 'react'
import { AuthProvider } from "./Auth";
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import { CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Todo from './components/Todo';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <CssBaseline/>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/tasks' element={<Todo/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
