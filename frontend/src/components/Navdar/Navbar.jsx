import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './../Navdar/navdar.css';
import { logoutUser, deleteUser } from '../../pages/redux/apicalls/auth';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // إغلاق القائمة عند النقر خارجها
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteAccount = () => {
    if (window.confirm("هل أنت متأكد من حذف حسابك؟")) {
      dispatch(deleteUser());
    }
    setShowLogout(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <i className="bi bi-chat-left-dots-fill"></i>
        <span className="nav-text">loke</span>
      </div>
      <div className="nav-link">
        {user ? (
          <>
            <Link to={`/profile/${user.id}`}>
              <i className="bi bi-person-circle"></i>
              <span className="nav-text">profile</span>
            </Link>
            
            <div className="settings-container" ref={settingsRef}>
              <div 
                className="settings-trigger" 
                onClick={() => setShowLogout(!showLogout)}
              >
                <i className="bi bi-gear"></i>
                <span className="nav-text">settings</span>
              </div>
              
              {showLogout && (
                <div className='logout-dropdown'>
                  <button 
                    onClick={() => {
                      dispatch(logoutUser());
                      setShowLogout(false);
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span className="nav-text">logout</span>
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                  >
                    <i className="bi bi-trash"></i>
                    <span className="nav-text">deleta account</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="nav-text">login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
