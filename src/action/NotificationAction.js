import { ADD_NOTIFICATION_FAILURE, ADD_NOTIFICATION_SUCESS, FETCH_NOTIFICATION_FAILURE, FETCH_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_FAILURE, REMOVE_NOTIFICATION_SUCESS, UPDATE_NOTIFICATION } from "../constant";
import { axiosAuth } from "./axios";


export const fetchNotification = () => {
    return async (dispatch) => {
        try {
            const response = await axiosAuth().get('/api/notifications/fetchall');
            dispatch({
                type: FETCH_NOTIFICATION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_NOTIFICATION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const addNotification = (notificationMessage) => {
    console.log(notificationMessage);
    return async (dispatch) => {
        try {
            const response = await axiosAuth().post(`/api/notifications/add/${notificationMessage}`);
            dispatch({
                type: ADD_NOTIFICATION_SUCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: ADD_NOTIFICATION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const removeNotification = (notificationID) => {
    console.log(notificationID)
;    return async (dispatch) => {
        try {
            const response = await axiosAuth().post(`/api/notifications/remove/${notificationID}`);
            dispatch({
                type: REMOVE_NOTIFICATION_SUCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: REMOVE_NOTIFICATION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const updateNotification = (notifications) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_NOTIFICATION,
            payload: notifications
        });
    };
};
