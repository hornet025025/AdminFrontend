import {   FETCH_SHIFT_REQUEST,
    FETCH_SHIFT_SUCCESS,
    FETCH_SHIFT_FAILURE,
    APPROVE_SHIFT_REQUEST,
    APPROVE_SHIFT_SUCCESS,
    APPROVE_SHIFT_FAILURE,
    REJECT_SHIFT_REQUEST,
    REJECT_SHIFT_SUCCESS,
    REJECT_SHIFT_FAILURE
 } from '../constant';
import { axiosAuth } from './axios';

// Action creators
export const fetchShiftRequest = () => ({
    type: FETCH_SHIFT_REQUEST,
});

export const fetchShiftSuccess = (data) => ({
    type: FETCH_SHIFT_SUCCESS,
    payload: data,
});

export const fetchShiftFailure = (error) => ({
    type: FETCH_SHIFT_FAILURE,
    payload: error,
});

// Thunk action to fetch shift amounts using Axios
export const fetchShiftAmountRequest = userId  => {
    return async (dispatch) => {
        dispatch(fetchShiftRequest());
        try {
            // Replace this URL with your actual API endpoint
            const response = await axiosAuth().get(`api/tcbalance/shift/amount/all`);
            dispatch(fetchShiftSuccess(response.data));
        } catch (error) {
            dispatch(fetchShiftFailure(error.message));
        }
    };
};

export const approveShiftRequest = () => ({ type: APPROVE_SHIFT_REQUEST });
export const approveShiftSuccess = (shiftId) => ({ type: APPROVE_SHIFT_SUCCESS, payload: shiftId });
export const approveShiftFailure = (error) => ({ type: APPROVE_SHIFT_FAILURE, payload: error });

export const approveShift = (shiftId) => {
    return async (dispatch) => {
        dispatch(approveShiftRequest());
        try {
            // Replace this with the actual API endpoint for approval
            await axiosAuth().post(`api/tcbalance/shift/accept/${shiftId}`);
            dispatch(approveShiftSuccess(shiftId));
        } catch (error) {
            dispatch(approveShiftFailure(error.message));
        }
    };
};

// Reject Shift Request
export const rejectShiftRequest = () => ({ type: REJECT_SHIFT_REQUEST });
export const rejectShiftSuccess = (shiftId) => ({ type: REJECT_SHIFT_SUCCESS, payload: shiftId });
export const rejectShiftFailure = (error) => ({ type: REJECT_SHIFT_FAILURE, payload: error });

export const rejectShift = (shiftId) => {
    return async (dispatch) => {
        dispatch(rejectShiftRequest());
        try {
            // Replace this with the actual API endpoint for rejection
            await axiosAuth().post(`api/tcbalance/shift/reject/${shiftId}`);
            dispatch(rejectShiftSuccess(shiftId));
        } catch (error) {
            dispatch(rejectShiftFailure(error.message));
        }
    };
};
