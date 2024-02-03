import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Summary from './pages/Summary'
import GridTemplate from './pages/GridTemplate';

function App() {
  return (
    <div className='app-container'>
   
    <div className="app-grid">
      <header className="app-header">
       <Navbar />
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Summary />}/>
          <Route path='/grid' element={<GridTemplate />}/>
        </Routes>
      </Router>
      <body className='app-body'>
      </body>
      <footer className='app-footer'>Contact</footer>
    </div>

    </div>
  );
}

export default App;
