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
import Chat from './pages/chatisok/Chat.jsx';
import ProfilePage from './pages/profile/Profile.jsx';
import { socket ,useSocketAuth } from './socket'; // تأكد من استيراد socket من المكان الصحيح

import ChatFriends from './pages/chatFriends/chat-friend.jsx';
import AddFriend from './pages/addfriends/AddFriend.jsx';
import GetConfirmFriends from './pages/addfriends/GetConfirmFriends.jsx';
import StartsendIsOk from './pages/chat/startchatIsOk.jsx';
import Startsendfriend from './pages/chat/startchatfriend.jsx';
function App() {
  useSocketAuth(); // استخدام hook لتحديث السوكيت عند تغيير المستخدم

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
        <ToastContainer theme='colored' position='top-right' autoClose={2000} />
        <Navbar />
        <Routes>

          <Route path="/" element={user ? <Navigate to="/chat-Friend" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/chat-Friend" /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/chat-Friend" /> : <Register />}
          />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
          <Route path="/chat/:id" element={user ? <StartsendIsOk /> : <Navigate to="/" />} />
          <Route path="/chat-Friend/:id" element={user ? <Startsendfriend /> : <Navigate to="/" />} />
          <Route path="/chat-Friend" element={user ? <ChatFriends /> : <Navigate to="/" />} />
          <Route path="/add-friend" element={user ? <AddFriend /> : <Navigate to="/" />} />
          <Route path="/getConfirmFriends" element={user ? <GetConfirmFriends /> : <Navigate to="/" />} />
          <Route path="/profile/:id" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>


      </Router>

    </>
  )
}

export default App
