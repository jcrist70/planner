import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// FB
import { auth } from './config/fb';
// COMPONENTS
import Navbar from './components/Navbar';
// PAGES
import Summary from './pages/Summary'
import GridTemplate from './pages/GridTemplate';
import Home from './pages/Home';
// API
import { verifyUser } from './apis/user.api';

function App() {
  const { email } = useSelector((state) => state.user, shallowEqual);
  
  useEffect(() => {
    setInterval(() => {
      // refreshToken();
    }, 10000);
  }, [])

  const refreshToken = async () => {

    try{
      const verification = await verifyUser();
      console.log('refreshToken ===========>> verification:', verification)
      if (verification.data.cookie !== 'expired' && parseInt(verification.data.expiresIn) <= 5) {
        auth.currentUser.getIdToken(true).then(async function (idToken) {
          console.log('refreshToken ===========>> idToken:', idToken)
          // const response = await updateSession(idToken); // eslint-disable-line
          // console.log('======> TOKEN REFRESHED:', response)
          try {
            // const dbUser = await updateCurrentUserTokens(idToken, email); // eslint-disable-line
          } catch (err) {
            // TBD remove log
            // console.log('updateSession, reloadSesion err:', err)
          } // reloadSession
        })
        .catch(function (error) {  // eslint-disable-line
          // console.log('===> REFRESH TOKEN ERROR:', error)
        });
      }
    } catch (err) {
      console.log('!! AUTO LOGIN ERROR !!', err)
    }
    
  }


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
