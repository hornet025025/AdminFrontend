import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, CircularProgress, Button, Grid, Paper, Divider, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import backgroundImage from '../../image/viewProfileImage.jpg'; // Import your background image
import { getAllCategoryBalance } from '../../action/TradeCategoryBalanceAction';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
    const { userId } = useParams(); // Get the user ID from the URL parameter
    const [userProfile, setUserProfile] = useState(null); // State to store the user profile data
    const [tradeCategoryBalances, setTradeCategoryBalances] = useState(null); // State to store trade category balances
    const { customers } = useSelector((state) => state.customerReducer); // Redux state containing all customers
    const dispatch = useDispatch();

    useEffect(() => {
        // Find the selected user from the list of customers based on the user ID
        const selectedUser = customers.find(user => user.id === parseInt(userId));
        if (selectedUser) {
            // Set the user profile data if the user is found
            setUserProfile(selectedUser);
        } else {
            // Handle case where user is not found
            console.log('User not found');
        }

        // Fetch trade category balances for the user
        dispatch(getAllCategoryBalance(userId));
    }, [customers, userId, dispatch]);

    const { tradeCatBal, error } = useSelector((state) => state.tradeCategoryBalanceReducer);

    useEffect(() => {
        setTradeCategoryBalances(tradeCatBal);
    }, [tradeCatBal]);

    if (!userProfile || !tradeCategoryBalances) {
        // Render loading indicator if user profile data or trade category balances are not yet fetched
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <div style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            minHeight: '100vh', 
            padding: '20px' 
        }}>
            <Container>
                <Typography variant="h4" gutterBottom style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
                    User Profile
                </Typography>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Name
                            </Typography>
                            <Typography variant="body1">
                                {`${userProfile.firstName} ${userProfile.middleName} ${userProfile.lastName}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.emailId}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Mobile No
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.mobileNo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Account Balance
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.balance}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Aadhar No
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.adharNo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Pan No
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.panNo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Date Of Birth
                            </Typography>
                            <Typography variant="body1">
                                {userProfile.dob}
                            </Typography>
                        </Grid>
                        {/* Add more user properties here */}
                    </Grid>
                </Paper>
                <Divider style={{ margin: '20px 0', background: '#fff' }} />
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                    <Typography variant="h4" gutterBottom style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
                        Trade Category Balances
                    </Typography>
                    <Grid container spacing={2}>
            
                    {/* Trade category balance details */}
                    {tradeCategoryBalances?.map((balance, index) => (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                              Category: {balance.tradeCategory}
                            </Typography>
                            <Typography variant="body1">
                              Balance: {balance.balance}
                            </Typography>
                        </Grid>
                    ))}
                    </Grid>
                </Paper>
                <Box display="flex" justifyContent="space-between" marginTop="20px">
                    <Button variant="contained" color="primary" component={Link} to={`/user/${userId}/transactions`} style={{ background: '#f50057', color: '#fff' }}>
                        View Transactions
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to={`/user/${userId}/profit-loss-details`} style={{ background: '#4caf50', color: '#fff' }}>
                        View Profit/Loss Details
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default UserProfile;
