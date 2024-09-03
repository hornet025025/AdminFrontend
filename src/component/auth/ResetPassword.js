import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResetPassword.css';
import { resetPasswordRequest } from '../../action/ForgotPasswordAction';
import { useSelector, useDispatch } from 'react-redux';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [execute, setExecute] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const resetPasswordReducer = useSelector((state) => state.forgotPasswordReducer);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    
    console.log('token');
    console.log(token);
    await dispatch(resetPasswordRequest({ token, password }));
    setMessage(resetPasswordReducer.resetMessage);
    setExecute(true);
    // Set a timeout to clear the message and navigate after 30 seconds
    setTimeout(() => {
      setMessage('');
      if(resetPasswordReducer.isReset) {
        navigate('/auth');
      } else {
        window.location.reload();
      }
    }, 20000); // 20 seconds
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {execute ? (
          <div className="reset-sent-message">
            ${message}
          </div>
        ) : (
          <div className="reset-password-container">
      <div className="password-input">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="password-input">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordReset}>Reset Password</button>
      </div>)}
    </div>
  );
}

export default ResetPassword;
