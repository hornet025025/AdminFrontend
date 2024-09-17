// reducer.js
import { 
    FETCH_QUERY_REQUEST, FETCH_QUERY_SUCCESS, FETCH_QUERY_FAILURE, 
    RESOLVE_QUERY_REQUEST, RESOLVE_QUERY_SUCCESS, RESOLVE_QUERY_FAILURE 
} from '../constant';

const initialState = {
    loading: false,
    queries: null,
    error: '',
    resolutionMessage: '',
};

export const queryResolutionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUERY_REQUEST:
        case RESOLVE_QUERY_REQUEST:
            return { ...state, loading: true };
        case FETCH_QUERY_SUCCESS:
            return { ...state, loading: false, queries: action.payload, error: '' };
        case FETCH_QUERY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case RESOLVE_QUERY_SUCCESS:
            return { ...state, loading: false, resolutionMessage: action.payload, error: '' };
        case RESOLVE_QUERY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
