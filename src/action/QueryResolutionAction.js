// actions.js
import axios from 'axios';
import { 
    FETCH_QUERY_REQUEST, FETCH_QUERY_SUCCESS, FETCH_QUERY_FAILURE, 
    RESOLVE_QUERY_REQUEST, RESOLVE_QUERY_SUCCESS, RESOLVE_QUERY_FAILURE 
} from '../constant';
import { axiosAuth } from './axios';

// Action creators for fetching query
export const fetchQueryRequest = () => ({ type: FETCH_QUERY_REQUEST });
export const fetchQuerySuccess = (query) => ({ type: FETCH_QUERY_SUCCESS, payload: query });
export const fetchQueryFailure = (error) => ({ type: FETCH_QUERY_FAILURE, payload: error });

// Action creators for resolving query
export const resolveQueryRequest = () => ({ type: RESOLVE_QUERY_REQUEST });
export const resolveQuerySuccess = (message) => ({ type: RESOLVE_QUERY_SUCCESS, payload: message });
export const resolveQueryFailure = (error) => ({ type: RESOLVE_QUERY_FAILURE, payload: error });

// Thunk to fetch query details
export const fetchQuery = () => async (dispatch) => {
    dispatch(fetchQueryRequest());
    try {
        const response = await axiosAuth().get(`/api/queryticket/all`);
        dispatch(fetchQuerySuccess(response.data));
    } catch (error) {
        dispatch(fetchQueryFailure(error.message));
    }
};

// Thunk to resolve query
export const resolveQuery = (queryId, resolution) => async (dispatch) => {
    dispatch(resolveQueryRequest());
    try {
        const response = await axiosAuth().post(`/api/queryticket/${queryId}/resolve`, resolution);
        dispatch(resolveQuerySuccess("Query resolved successfully"));
    } catch (error) {
        dispatch(resolveQueryFailure(error.message));
    }
};
