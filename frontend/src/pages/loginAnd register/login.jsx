import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/apicalls/auth';
import './login.css';
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async(e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Email or Password is empty");
      return;
    }

    dispatch(loginUser({ email, password }))
      .then(setEmail(""))
      .then(setPassword(""));
      setTimeout(() => {
      }, 5000);
    
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <div className="login-form">
              <h1>Login</h1>
              <form onSubmit={onSubmit}>
                <div className="login__field">
                  <input 
                    type="email" 
                    className="login__input" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="login__field">
                  <input 
                    type="password" 
                    className="login__input" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button className="login__submit" type="submit">
                  Login
                </button>
              </form>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape1"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape4"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
