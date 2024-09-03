import React, { useState, useEffect } from 'react';
import './ViewAllCustomer.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomerInfo, removeUser, resetCustomerReduxState } from '../../action/CustomerAction';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ViewAllCustomer = () => {
    // State to store the selected user ID for profile view
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { customers, error, loading, successMessage } = useSelector((state) => state.customerReducer);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        dispatch(getAllCustomerInfo());
    };

    const handleRemoveUser = (userId) => {
        dispatch(removeUser(userId));
    };

    const handleReload = () => {
        fetchUsers();
    };

    const handleReopen = () => {
        dispatch(resetCustomerReduxState());
        navigate('/view-users')
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleReload}>
                    Reload
                </Button>
            </Container>
        );
    }

    if (successMessage) {
        return (
            <Container>
                <Typography variant="h6" color="success">
                    Success: {successMessage}
                </Typography>
                <Typography variant="h6" gutterBottom>
                   Submit another query or reopen the query form:
                </Typography>
                <Button variant="contained" color="primary" onClick={handleReopen}>
                      Reopen
                </Button>
            </Container>
        );
    }

    const filteredUsers = customers.filter(user => 
        `${user.firstName} ${user.middleName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle viewing user profile
    const handleViewProfile = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <div className="container">
            <h1>All Users</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by user name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Account Balance</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{`${user.id}`}</td>
                                <td>{`${user.firstName} ${user.middleName} ${user.lastName}`}</td>
                                <td>{user.balance}</td>
                                <td>{user.emailId}</td>
                                <td>{user.mobileNo}</td>
                                <td>
                                    <button onClick={() => handleRemoveUser(user.id)} className="remove-button">Remove</button>
                                    {/* Add a button to view user profile */}
                                    <Link to={`/userProfile/${user.id}`} className="view-profile-button">View Profile</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/home" className="btn">Go Back</Link>

            {/* Redirect to the user profile page if a user is selected */}
            {selectedUserId && <Link to={`/userProfile/${selectedUserId}`} />}
        </div>
    );
};

export default ViewAllCustomer;
