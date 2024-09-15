import React, { useState, useEffect } from 'react';
import { Radio, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, FormControl, RadioGroup, FormControlLabel, Paper, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRejectRequest, getCreditDebitRequest } from '../../action/CreditDebitRequestARAction';

const CreditDebitRequestAR = () => {
  const [requestType, setRequestType] = useState('debit');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [transactionRequests, setTransactionRequest] = useState([]);
  const { creditDebitRequests, error } = useSelector((state) => state.creditDebitRequestReducer);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(()=> {
    setTransactionRequest(creditDebitRequests);
  }, [creditDebitRequests])

  const fetchRequests = () => {
    dispatch(getCreditDebitRequest());
  };

  const handleReload = () => {
    window.location.reload();
};


  const handleAccept = async (id) => {
    try {
      dispatch(acceptRejectRequest({ transactionId: id, actionType: "ACCEPT" }));
      window.location.reload();
    } catch (error) {
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
  };

  const handleReject = async (id) => {
    try {
      dispatch(acceptRejectRequest({ transactionId: id, actionType: "REJECT" }))
      window.location.reload();
    } catch (error) {
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
  };

  const filteredRequests = transactionRequests.filter(request =>
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.transaction.id}>
                <TableCell>{`${request.customerDto.firstName} ${request.customerDto.middleName} ${request.customerDto.lastName}`}</TableCell>
                <TableCell>{request.transaction.transactionAmount}</TableCell>
                <TableCell>{request.transaction.transactionDate}</TableCell>
                <TableCell>{request.transaction.transactionId}</TableCell>
                <TableCell>{request.transaction.bankName}</TableCell>
                <TableCell>{request.transaction.requestStatus}</TableCell>
                <TableCell>
                      <span className={`badge ${
                          request.transaction.requestStatus === 'APPROVED' ? 'bg-success' : 'bg-warning'
                      }`}>{request.transaction.requestStatus}</span>
                  </TableCell>
                <TableCell>
                  <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => handleAccept(request.transaction.id)}>Accept</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(request.transaction.id)}>Reject</Button>
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
