import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Summary from './pages/Summary'
import GridTemplate from './pages/GridTemplate';
import Home from './pages/Home';

function App() {
  return (
    <div className='app-container'>
   
    <div className="app-grid">
      
      <Router>
      <header className="app-header">
       <Navbar />
      </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/grid' element={<GridTemplate />} />
        </Routes>
      </Router>
      <footer className='app-footer'>Contact</footer>

    </div>
  </div>
  );
}

export default App;
