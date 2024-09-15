import { FETCH_SHIFT_REQUEST,
    FETCH_SHIFT_SUCCESS,
    FETCH_SHIFT_FAILURE,
    APPROVE_SHIFT_REQUEST,
    APPROVE_SHIFT_SUCCESS,
    APPROVE_SHIFT_FAILURE,
    REJECT_SHIFT_REQUEST,
    REJECT_SHIFT_SUCCESS,
    REJECT_SHIFT_FAILURE
 } from '../constant';

const initialState = {
    loading: false,
    shiftAmounts: [],
    error: '',
};

const shiftAmountRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHIFT_REQUEST:
        case APPROVE_SHIFT_REQUEST:
        case REJECT_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FETCH_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                shiftAmounts: action.payload,
                error: '',
            };

        case FETCH_SHIFT_FAILURE:
        case APPROVE_SHIFT_FAILURE:
        case REJECT_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case APPROVE_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                shiftAmounts: state.shiftAmounts.map(shift =>
                    shift.id === action.payload ? { ...shift, requestStatus: 'APPROVED' } : shift
                ),
            };

        case REJECT_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                shiftAmounts: state.shiftAmounts.map(shift =>
                    shift.id === action.payload ? { ...shift, requestStatus: 'REJECTED' } : shift
                ),
            };

        default:
            return state;
    }
};

export default shiftAmountRequestReducer;
