import React, { useState } from 'react';
import './ForgotPassword.css'; // Import your CSS file for styling
import { useSelector, useDispatch } from 'react-redux';
import { forgotPasswordRequest } from '../../action/ForgotPasswordAction';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [message, setMessage] = useState('');
  const passwordReset = useSelector(state => state.forgotPasswordReducer)
  const dispatch = useDispatch();

  const handleReset = () => {
      console.log(email);
      dispatch(forgotPasswordRequest(email));
      setMessage(passwordReset.forgotMessage);
      setIsResetSent(true);
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-form">
        <h2>Reset Your Password</h2>
        {isResetSent ? (
          <div className="reset-sent-message">
           passwordReset.forgotMessage
          </div>
        ) : (
          <form>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" onClick={handleReset}>
              Reset Password
            </button>
            <p className="message">{message}</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
