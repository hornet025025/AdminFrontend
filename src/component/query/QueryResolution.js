import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import { Alert } from 'react-bootstrap';
import { fetchQuery, resolveQuery } from '../../action/QueryResolutionAction';

const QueryResolution = () => {
    const dispatch = useDispatch();                                                   
    const { queries, loading, error, resolutionMessage } = useSelector(state => state.queryResolutionReducer); // Now fetching all queries
    const [resolution, setResolution] = useState({}); // Store resolution for each query

    // Fetch all queries when the component loads
    useEffect(() => {
        dispatch(fetchQuery()); // Assuming fetchQuery fetches a list of queries
    }, [dispatch]);

    // Handle resolution submit for a specific query
    const handleResolutionSubmit = (queryId) => {
        if (resolution[queryId]) {
            dispatch(resolveQuery(queryId, resolution[queryId]));
        }
    };

    // Handle resolution input change
    const handleResolutionChange = (queryId, value) => {
        setResolution({
            ...resolution,
            [queryId]: value // Update resolution for specific queryId
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            {resolutionMessage && <Alert variant="success">{resolutionMessage}</Alert>}

            {queries && queries.length > 0 ? (
                queries.map(query => (
                    <Card key={query.queryId} className="mb-4">
                        <CardContent>
                            <Typography variant="h5">Query Details</Typography>
                            <Typography><strong>QueryId:</strong> {query.queryTicketDto.queryId}</Typography>
                            <Typography><strong>User Id:</strong> {query.queryTicketDto.userId}</Typography>
                            <Typography><strong>Message:</strong> {query.queryTicketDto.message}</Typography>
                            <Typography><strong>Date:</strong> {new Date(query.queryTicketDto.date).toLocaleDateString()}</Typography>
                            <Typography><strong>Status:</strong> {query.queryTicketDto.queryStatus}</Typography>
                        </CardContent>

                        <CardContent>
                            <Typography variant="h6">Add Resolution</Typography>
                            <TextField 
                                label="Resolution" 
                                variant="outlined" 
                                fullWidth 
                                value={resolution[query.queryTicketDto.queryId] || ''} 
                                onChange={(e) => handleResolutionChange(query.queryTicketDto.queryId, e.target.value)} 
                            />
                            <Button 
                                className="mt-3" 
                                variant="contained" 
                                color="primary" 
                                onClick={() => handleResolutionSubmit(query.queryTicketDto.queryId)} // Submit resolution for this query
                            >
                                Submit Resolution
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No queries found</Typography>
            )}
        </Container>
    );
};

export default QueryResolution;
