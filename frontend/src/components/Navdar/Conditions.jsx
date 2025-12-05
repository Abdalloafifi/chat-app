import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Conditions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="conditions-container" ref={dropdownRef}>
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>
      
      <div className={`dropdown-content ${isOpen ? 'active' : ''}`}>
        <Link to="/chat-Friend" className="btn-edit-content">
          Chat Friends
        </Link>
        <Link to="/chat" className="btn-edit-content">
          Strangers
        </Link>
        <Link to="/add-friend" className="btn-edit-content">
          Add Friend
        </Link>
        <Link to="/getConfirmFriends" className="btn-edit-content">
          Confirm Friends
        </Link>
      </div>
    </div>
  );
};

export default Conditions;