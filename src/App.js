import React from 'react'
import { AuthProvider } from "./Auth";
import Signup from './components/Signup';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      Hey
    </div>
    </AuthProvider>
  );
}

export default App;
