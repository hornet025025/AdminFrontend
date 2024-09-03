import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfitLoss } from '../../action/ProfitLossAction';

const ViewProfitLoss = () => {
    const { userId } = useParams();
    const [profitLossDetails, setProfitLossDetails] = useState(null);
    const { profitLossRecords, error } = useSelector((state) => state.profitLossReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfitLoss(userId));
    }, [userId, dispatch]);

    useEffect(() => {
        setProfitLossDetails(profitLossRecords);
    }, [profitLossRecords]);

    const handleReload = () => {
        dispatch(fetchProfitLoss(userId));
        setProfitLossDetails(profitLossRecords);
    };

    if (profitLossDetails === null) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error != null) {
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

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Profit/Loss Details
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Trade Date</TableCell>
                            <TableCell>Balance Before Trade</TableCell>
                            <TableCell>Profit/Loss Percent</TableCell>
                            <TableCell>Balance After Trade</TableCell>
                            <TableCell>Trade Category</TableCell>
                            <TableCell>Profit/Loss</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profitLossDetails.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell>{record.tradeDate}</TableCell>
                                <TableCell>{record.balanceBT}</TableCell>
                                <TableCell>{record.profitLossPercent}</TableCell>
                                <TableCell>{record.balanceAT}</TableCell>
                                <TableCell>{record.tradeCategory}</TableCell>
                                <TableCell>{record.profitLoss}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ViewProfitLoss;
