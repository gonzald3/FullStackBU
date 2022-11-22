import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/register/SignUp';
import Context from './context';
import Home from './components/home/Home';

import Profile from './components/profile/Profile';
import './index.css';

function App() {

  const [user, setUser] = useState(null);
  const [hasNewPost, setHasNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    initAuthUser();
    //initCometChat();
  }, []);


  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  return (

    <Context.Provider value={{user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
      </Context.Provider>

  );
  


}

export default App;
