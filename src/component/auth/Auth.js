import React, { useState, useEffect } from 'react';
import './Auth.css';
import { SignIn, SignUp } from "../../action/AuthAction"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
// import { Prev } from 'react-bootstrap/esm/PageItem';

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [checkPasswod, setCheckPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        firstName: '', middleName: '', lastName: '', mobileNo: '', emailId: '', password: '', 
        adharNo: '', panNo: '', balance : 0, referral : '', dob : null, plan : ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authReducer);

    useEffect(() => {
       if (auth.authenticate) {
           navigate("/home")
       }
    },[auth.authenticate, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const newErrors = {};
        setErrors(newErrors);
        if (user.emailId == null) {
            newErrors.emailId = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.emailId)) {
            newErrors.emailId = 'Invalid email address';
        }
        if (user.password === null) {
            newErrors.password = 'Password is required';
        }
        if (isSignIn) {
            dispatch(SignIn({ emailId: user.emailId, password: user.password }));
            navigate("/home");
        } else {
            if (user.firstName === null) {
                newErrors.firstName = 'First Name is required';
            }
            if (user.middleName === null) {
                newErrors.middleName = 'middle Name is required';
            }
            if (user.lastName === null) {
                newErrors.lastName = 'Last Name is required';
            }
            if (user.password === null) {
                newErrors.password = 'Password is required';
            } else if (user.password !== confirmPassword) {
                console.log(user);
                newErrors.confirmPassword = 'Passwords do not match';
                setCheckPassword(true)
            }
             // Validate Mobile Number
            if (user.mobileNo === null) {
                newErrors.mobileNo = 'Mobile Number is required';
            } else if (!/^\d{10}$/.test(user.mobileNo)) {
                newErrors.mobileNo = 'Invalid Mobile Number';
            }
            // Validate PAN Number
            if (user.panNo === null) {
                newErrors.panNo = 'PAN Number is required';
            } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(user.panNo)) {
                newErrors.panNo = 'Invalid PAN Number';
            }
            // Validate Aadhar Number
            if (user.adharNo === null) {
                newErrors.adharNo = 'Aadhar Number is required';
            } else if (!/^\d{12}$/.test(user.adharNo)) {
                newErrors.adharNo = 'Invalid Aadhar Number';
            }
            if (user.dob === null) {
                newErrors.dob = 'date of birth is required';
            }
            setErrors(newErrors);
            // If no errors, submit form
            if (Object.keys(newErrors).length === 0) {
                dispatch(SignUp(user));
                navigate("/auth")
            }
        }
    };

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const switchMod = () => {
        setIsSignIn(Prev => !Prev);
    }

    const resetPassword = () => {
        navigate('/passwordreset')
    };
    
    return (
        <div className="auth-container">
            <div className="bg-gray-100 bg-opacity-50 auth-card">
                <form onSubmit={submitHandler}>
                  <div className="name-inputs" >
                    {
                        
                        !isSignIn && <div>
                        <input name="firstName" type="text" placeholder="First Name" value={user.firstName}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                    }
                    {
                        !isSignIn && <div>
                        <input name="middleName" type="text" placeholder="Middle Name" value={user.middleName}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.middleName && <span className="error">{errors.middleName}</span>}
                        </div>
                    }
                    {
                        !isSignIn && <div>
                        <input name="lastName" type="text" placeholder="Last Name" value={user.lastName}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    }
                  </div>
                    {
                        !isSignIn && <div>
                        <input name="mobileNo" type="text" placeholder="Mobile No" value={user.mobileNo}
                            onChange={(e) => changeHandler(e)}
                            required
                        /> 
                        {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
                        </div>
                    }
                     {
                        !isSignIn && <div>
                        <input name="adharNo" type="text" placeholder="Adhar No" value={user.adharNo}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.adharNo && <span className="error">{errors.adharNo}</span>}
                        </div>
                    }
                     {
                        !isSignIn && <div>
                        <input name="panNo" type="text" placeholder="Pan No" value={user.panNo}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.panNo && <span className="error">{errors.panNo}</span>}
                        </div>
                    }
                     {
                        !isSignIn && <div>
                        <input name="dob"  type="date" id="birthdate" onfocus="(this.type='date')" onblur="(this.type='text')"
                        placeholder="Birth Date" value={user.dob}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                        {errors.dob && <span className="error">{errors.dob}</span>}
                        </div>
                    }
                     {
                        !isSignIn &&
                        <input name="balance" type="numeric" placeholder="Intial Deposite" value={user.balance}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                    }
                    {
                        !isSignIn &&
                        <input name="referral" type="text" placeholder="Referal Code" value={user.referral}
                            onChange={(e) => changeHandler(e)}
                            required
                        />
                    }
                    <input name="emailId" type="text" placeholder="Email Id" value={user.emailId}
                        onChange={(e) => changeHandler(e)}
                        required
                    />
                    {errors.emailId && <span className="error">{errors.emailId}</span>}
                    <input name="password" type="password" placeholder={checkPasswod ? "Password Not Match ReEnter" : "Password"} value={user.password}
                        onChange={(e) => changeHandler(e)}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    {
                        !isSignIn &&
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    }
                    <button onClick={submitHandler} className='login-button login-button'
                        type='submit' variant="contained"  color="primary">
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </button>
                    
                    {
                     isSignIn &&
                     <div>
                        <a href="#" onClick={resetPassword} className="reset-password-link">
                            Forgot Password?
                        </a>
                    </div>
                    }
                    <div>
                        <button onClick={switchMod} className="switch-button">
                            {isSignIn ? `Don't Have an Account ? Sign Up` :
                                `Already Have an Account ? Sign In`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
