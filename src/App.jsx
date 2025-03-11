import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Routes from './components/routes.jsx';
import NavBar from './components/NavBar';
import JoblyApi from './api.js';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import { jwtDecode } from 'jwt-decode';
import UserContext from './UserContext.jsx';
import LoadingPage from './components/LoadingPage.jsx';


const TOKEN_STORAGE = 'jobly-token'

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUser() {

    async function getCurrentUser() {
      if (token){
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (e) {
          console.error('error:', e)
          setCurrentUser(null);
        }
      }
      setUserLoaded(true);
    }
    setUserLoaded(false);
    getCurrentUser()
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const login = async (data) => {
    const { token } = await JoblyApi.getToken(data);
    setToken(token);
    return {success: true};
  }
  const register = async (data) => {
    const token = await JoblyApi.makeUser(data);
    console.log(token);
  }

  const hasApplied = (id) => applicationIds.has(id);

  const applyToJob = (id) => {
    if (hasApplied(id)) return;

    console.log(currentUser.username);
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }
  
  if (!userLoaded) return <LoadingPage />;

  return (
    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider 
        value={{ currentUser, setCurrentUser, hasApplied, applyToJob }}>
        <NavBar logout={logout}/>
        <main>
          <Routes login={login} register={register}/>
        </main>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
