import React from 'react'
import { AuthProvider } from "./Auth";
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import { CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <CssBaseline/>
      <Sidebar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
