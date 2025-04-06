import './App.css';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viledLogin } from './pages/redux/apicalls/auth';
import Navbar from './components/Navdar/Navbar.jsx';
import Home from './pages/Home/Home';

import { ToastContainer } from 'react-toastify';
import Login from './pages/loginAnd register/login.jsx';
import Register from './pages/loginAnd register/register.jsx';
import Chat from './pages/chat/Chat.jsx';
import Startsend from './pages/chat/startchat.jsx';
import ProfilePage from './pages/profile/Profile.jsx';
import { socket } from './socket'; // تأكد من استيراد socket من المكان الصحيح

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.cookie.includes("token")) {
      dispatch(viledLogin());
    }
  }, [dispatch, user]);


  useEffect(() => {
    if (user?.id) {
      socket.connect(); // الاتصال فقط إذا كان المستخدم مسجلاً
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [user]);
  return (
    <>
      <Router>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        <Navbar />
        <Routes>

          <Route path="/" element={user ? <Navigate to="/chat" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/chat" /> : <Register />}
          />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
          <Route path="/chat/:id" element={user ? <Startsend /> : <Navigate to="/" />} />
          <Route path="/profile/:id" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>


      </Router>

    </>
  )
}

export default App
