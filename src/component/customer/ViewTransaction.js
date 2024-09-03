import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction } from '../../action/CreditDebitRequestARAction';

const ViewTransaction = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState(null);
  const { userCreditDebitRequests, error } = useSelector((state) => state.creditDebitRequestReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransaction(userId));
    setTransactions(userCreditDebitRequests);
  }, [dispatch, userId, userCreditDebitRequests]);
  
  const handleReload = () => {
    dispatch(getAllTransaction(userId));
    setTransactions(userCreditDebitRequests);
  };

  if (!transactions) {
    return (
      <Container style={{ paddingTop: '64px', paddingBottom: '64px' }}>
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
    <Container style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: '#1976d2' }}>
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1a237e', color: '#ffffff' }}>
              <TableCell>ID</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Requested Status</TableCell>
              <TableCell>Date</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#bbdefb' }}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.balance}</TableCell>
                <TableCell>{transaction.transactionAmount}</TableCell>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell>{transaction.requestStatus}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                {/* Add more table cells for additional transaction details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewTransaction;
