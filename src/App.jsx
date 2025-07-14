import './App.css';
import Header from './Header';
import Footer from './Footer';
import GlassGame from './GlassGame';
import Login from './Login';
import Signup from './Signup';
import ThreeD from './ThreeD'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      
      <Header />

    
      <Routes>
        <Route path="/" element={<GlassGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

     
      <Footer />
    </>
  );
}

export default App;
