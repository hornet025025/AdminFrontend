import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import TablePagination from '@mui/material/TablePagination';
import { fetchShiftAmountRequest, approveShift, rejectShift } from '../../action/ShiftAmountRequestAction';

const ShiftAmountRequest = () => {
    const dispatch = useDispatch();
    const { loading, shiftAmounts, error } = useSelector((state) => state.shifts);
    
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user.id);
        dispatch(fetchShiftAmountRequest(user.id));
    }, [dispatch]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleApprove = (shiftId) => {
        dispatch(approveShift(shiftId));
        window.location.reload();
    };

    const handleReject = (shiftId) => {
        dispatch(rejectShift(shiftId));
        window.location.reload();
    };

    const renderTooltip = (text) => (
        <Tooltip>{text}</Tooltip>
    );

    return (
        <div className="container my-4">
        <h2 className="text-center mb-4">Shift Amount List</h2>
        <Card className="shadow-lg mb-4 p-4">
            <Card.Body>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && shiftAmounts.length === 0 && <p>No shift amount requests found.</p>}
                <TableContainer component={Paper}>
                    <Table aria-label="shift amount table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Shift ID</TableCell>
                                <TableCell>From Category</TableCell>
                                <TableCell>To Category</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Request Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shiftAmounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((shift, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{shift.shiftId}</TableCell>
                                    <TableCell>{shift.fromCategory}</TableCell>
                                    <TableCell>{shift.toCategory}</TableCell>
                                    <TableCell>${shift.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={`badge ${
                                            shift.requestStatus === 'APPROVED' ? 'bg-success' : 'bg-warning'
                                        }`}>{shift.requestStatus}</span>
                                    </TableCell>
                                    <TableCell>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip('Approve')}
                                        >
                                              <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleApprove(shift.shiftId)}
                                                >
                                                <FaCheck />
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip('Reject')}
                                        >
                                            <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => handleReject(shift.shiftId)}
                                            >
                                                <FaTimes />
                                            </Button>
                                        </OverlayTrigger>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={shiftAmounts.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </TableContainer>
            </Card.Body>
        </Card>
    </div>
);
}


export default ShiftAmountRequest;