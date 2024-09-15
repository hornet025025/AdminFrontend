import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './component/auth/Auth';
import Home from './component/home/Home';
import AddProfitLoss from './component/profitloss/AddProfitLoss';
import CreditDebitRequestAR from './component/creditdebit/CreditDebitRequestAR';
import ViewAllCustomer from './component/customer/ViewAllCustomer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ResetPassword from './component/auth/ResetPassword';
import ForgotPassword from './component/auth/ForgotPassword'
import Footer from './component/footer/Footer';
import UserProfile from './component/customer/UserProfile';
import ViewTradeCategoryBalance from './component/customer/ViewTradeCategoryBalance';
import ViewTransaction from './component/customer/ViewTransaction';
import ViewProfitLoss from './component/customer/ViewProfitLoss';
import ManageNotification from './component/notification/ManageNotification';
import ShiftAmountRequest from './component/shiftmoney/ShiftAmountRequest';

function App() {
  const auth = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const publicPaths = ["/passwordreset", "/resetpassword"];
  useEffect(() => {
    const currentPath = window.location.pathname;
    const requiresAuthentication = !publicPaths.includes(currentPath);
    if (!auth.authenticate && requiresAuthentication)
      navigate('/auth');
  }, [auth.authenticate, navigate]);
  return (
    <>
    <Routes>
       <Route path="/auth" element={<Auth />} />
       <Route path="/passwordreset" element={<ForgotPassword />} />
       <Route path="/resetpassword" element={<ResetPassword />} />
       <Route path="/home" element={<Home />} />
       <Route path="/add-profit-loss" element={<AddProfitLoss />} />
       <Route path="/creditDebiRequestAC" element={<CreditDebitRequestAR />} />
       <Route path="/view-users" element={<ViewAllCustomer />} />
       <Route path='/userProfile/:userId' element={<UserProfile />} />
       <Route path='/user/:userId/trade-category-balances' element={<ViewTradeCategoryBalance />} />
       <Route path='/user/:userId/transactions' element={<ViewTransaction />} />
       <Route path='/user/:userId/profit-loss-details' element={<ViewProfitLoss />} />
       <Route path='/notificationManager' element={<ManageNotification />}  />
       <Route path='/shiftamountrequestManager' element={<ShiftAmountRequest />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
