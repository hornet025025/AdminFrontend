// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    return (
        <div className="bg-white shadow dark:bg-gray-900 rounded-lg mt-2 ml-4 mr-4 mb-2 home-container">
            <h1>Welcome to Admin Panel</h1>
            <div className="grid block-container rounded-lg mt-2 ml-4 mr-4 mb-2">
                <div className="block1">
                    <h2>Add Trading Profit/Loss</h2>
                    <p>View and add profits or losses to trades.</p>
                    <Link to="/add-profit-loss" className="btn">Go</Link>
                </div>
                <div className="block1">
                    <h2>Accept Debit Requests</h2>
                    <p>View and accept pending debit requests.</p>
                    <Link to="/creditDebiRequestAC" className="btn">Go</Link>
                </div>
                <div className="block1">
                    <h2>View All Users</h2>
                    <p>View details of all registered users.</p>
                    <Link to="/view-users" className="btn">Go</Link>
                </div>
                <div className="block1">
                    <h2>Notification Manager</h2>
                    <p>Add notification and remove notification.</p>
                    <Link to="/notificationManager" className="btn">Go</Link>
                </div>
                <div className="block">
                    <h2>Shift Amount Request Manager</h2>
                    <p>Accept & Reject shift amount  request.</p>
                    <Link to="/shiftamountrequestManager" className="btn">Go</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
