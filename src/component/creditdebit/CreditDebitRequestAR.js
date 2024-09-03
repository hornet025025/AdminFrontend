import React, { useState, useEffect } from 'react';
import { Radio, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, FormControl, RadioGroup, FormControlLabel, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRejectRequest, getCreditDebitRequest } from '../../action/CreditDebitRequestARAction';

const CreditDebitRequestAR = () => {
  const [requestType, setRequestType] = useState('debit');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { creditDebitRequests, error } = useSelector((state) => state.creditDebitRequestReducer);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    dispatch(getCreditDebitRequest());
  };

  const handleAccept = async (id) => {
    try {
      dispatch(acceptRejectRequest({ transactionId: id, actionType: "ACCEPT" }))
      fetchRequests(); // Refresh the list after accepting
    } catch (error) {
      console.error(`Error accepting ${requestType} request:`, error);
    }
  };

  const handleReject = async (id) => {
    try {
      dispatch(acceptRejectRequest({ transactionId: id, actionType: "REJECT" }))
      fetchRequests(); // Refresh the list after rejecting
    } catch (error) {
      console.error(`Error rejecting ${requestType} request:`, error);
    }
  };

  const filteredRequests = creditDebitRequests.filter(request =>
    ((requestType === 'debit' && request.transaction.transactionType === 'DEBIT') ||
      (requestType === 'credit' && request.transaction.transactionType === 'CREDIT')) &&
    `${request.customerDto.firstName} ${request.customerDto.middleName} ${request.customerDto.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '90%', margin: 'auto', marginTop: '20px' }}>
      <Typography variant="h4" align='center' gutterBottom>Debit/Credit Requests</Typography>
      <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
        <RadioGroup row value={requestType} onChange={(e) => setRequestType(e.target.value)}>
          <FormControlLabel value="debit" control={<Radio />} label="Debit Requests" />
          <FormControlLabel value="credit" control={<Radio />} label="Credit Requests" />
        </RadioGroup>
      </FormControl>
      <TextField
        style={{ marginBottom: '20px' }}
        variant="outlined"
        label="Search by user name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Transaction Id</TableCell>
              <TableCell>Bank Name</TableCell> 
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{`${request.customerDto.firstName} ${request.customerDto.middleName} ${request.customerDto.lastName}`}</TableCell>
                <TableCell>{request.transaction.transactionAmount}</TableCell>
                <TableCell>{request.transaction.transactionDate}</TableCell>
                <TableCell>{request.transaction.transactionId}</TableCell>
                <TableCell>{request.transaction.bankName}</TableCell>
                <TableCell>
                  <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => handleAccept(request.transaction.id)}>Accept</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreditDebitRequestAR;
