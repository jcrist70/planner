import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// FB
import { auth } from './config/fb';
// COMPONENTS
import Navbar from './components/Navbar';
// PAGES
import Ballances from './pages/Ballances';
import Planner from './pages/Planner';
import Debts from './pages/Debts';
import Summary from './pages/Summary'
import GridTemplate from './pages/GridTemplate';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
// API
import { verifyUser } from './apis/user.api';
// REDUX 
import { setLoginStatus, resetUser } from './redux/user.slice';
import { setContext, setPage } from './redux/app.slice';


function App() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user, shallowEqual);
  const { loggedIn } = useSelector((state) => state.user, shallowEqual);
  
  useEffect(() => {
    setInterval(() => {
      refreshToken();
    }, 5000);
    if (!loggedIn) {
      console.log('NOT LOGGED IN')
      dispatch(setContext('login'));
      window.history.pushState({}, '', '/') ;
    }
  }, [])

  const refreshToken = async () => {

    try{
      const verification = await verifyUser();
      console.log('refreshToken ===========>> verification:', verification)
      // If the token has not expired AND will expire within 5 min, refresh
      if (verification.data.status !== 'expired' && parseInt(verification.data.expiresIn) <= 5) {
        auth.currentUser.getIdToken(true).then(async function (idToken) {
          console.log('refreshToken ===========>> idToken:', idToken)
          const response = await updateSession(idToken); // eslint-disable-line
          console.log('======> TOKEN REFRESHED:', response)
        })
        .catch(function (error) {  // eslint-disable-line
          // console.log('===> REFRESH TOKEN ERROR:', error)
        });
      } else if (verification.data.status === 'no session') {
        // LOGOUT LOCALLY
        dispatch(resetUser());
        dispatch(setLoginStatus(false));
        console.log('NOT LOGGED IN')
        dispatch(setContext('login'));
        
        window.history.pushState({}, '', '/login') ;
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
          {loggedIn && <Route path='/ballances' element={<Ballances />} />}
          {loggedIn && <Route path='/planner' element={<Planner />} />}
          {loggedIn && <Route path='/accounts' element={<Accounts />} />}
          {loggedIn && <Route path='/credits' element={<Home />} />}
          {loggedIn && <Route path='/investments' element={<Home />} />}
          {loggedIn && <Route path='/debts' element={<Debts />} />}
          {loggedIn && <Route path='/loans' element={<Home />} />}
          {loggedIn && <Route path='/summary' element={<Summary />} />}
          {loggedIn && <Route path='/grid' element={<GridTemplate />} />}
          <Route path='*' element={<Home />} />

        </Routes>
      </Router>
      <footer className='app-footer'>Contact</footer>

    </div>
  </div>
  );
}

export default App;
