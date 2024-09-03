import {
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILURE,
    UPDATE_NOTIFICATION,
    ADD_NOTIFICATION_SUCESS,
    ADD_NOTIFICATION_FAILURE
} from '../constant';

const initialState = {
    notifications: null,
    error: null,
    adNSMessage: null
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATION_SUCCESS:
            state.notifications = action.payload;
            state.error = null;
            state.adNSMessage = null;
            break;
        case FETCH_NOTIFICATION_FAILURE:
            state.error = action.error;
            state.notifications = [];
            state.adNSMessage = null;
            break;
        case ADD_NOTIFICATION_SUCESS:
            state.notifications = [];
            state.error = null;
            state.adNSMessage = action.payload;
            break;
        case ADD_NOTIFICATION_FAILURE:
            state.notifications = [];
            state.error = action.payload;
            state.adNSMessage = null;
            break;
        default:
            break;
    }
    return {
        ...state
    };
}

export default notificationReducer;
