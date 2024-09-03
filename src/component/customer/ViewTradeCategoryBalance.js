import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryBalance } from '../../action/TradeCategoryBalanceAction';

const ViewTradeCategoryBalance = () => {
    const { userId } = useParams();
    const [tradeCategoryBalances, setTradeCategoryBalances] = useState(null);
    const { tradeCatBal, error } = useSelector((state) => state.tradeCategoryBalanceReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoryBalance(userId));
        setTradeCategoryBalances(tradeCatBal);
    }, [userId]); // Removed empty dependency array

    if (!tradeCategoryBalances) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container style={{ backgroundImage: `url('../../image/tradingBalace.jpg')`, backgroundSize: 'cover', minHeight: '100vh', paddingTop: '50px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
                    Trade Category Balances
                </Typography>
                {tradeCategoryBalances?.map((balance, index) => (
                    <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#ffffff80' }}>
                        <Typography variant="h6" gutterBottom style={{ color: '#000000' }}>
                            {balance.tradeCategory}
                        </Typography>
                        <Typography variant="body1" style={{ color: '#000000' }}>
                            Balance: {balance.balance}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default ViewTradeCategoryBalance;
