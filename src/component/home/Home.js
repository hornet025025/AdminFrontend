// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Admin Panel</h1>
            <div className="block-container">
                <div className="block">
                    <h2>Add Trading Profit/Loss</h2>
                    <p>View and add profits or losses to trades.</p>
                    <Link to="/add-profit-loss" className="btn">Go</Link>
                </div>
                <div className="block">
                    <h2>Accept Debit Requests</h2>
                    <p>View and accept pending debit requests.</p>
                    <Link to="/creditDebiRequestAC" className="btn">Go</Link>
                </div>
                <div className="block">
                    <h2>View All Users</h2>
                    <p>View details of all registered users.</p>
                    <Link to="/view-users" className="btn">Go</Link>
                </div>
                <div className="block">
                    <h2>Notification Manager</h2>
                    <p>Add notification and remove notification.</p>
                    <Link to="/notificationManager" className="btn">Go</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
