import { 
    FECH_CUSTOMER_INFO_FAILED,
    FECH_CUSTOMER_INFO_REQUEST,
    FECH_CUSTOMER_INFO_SUCESS, 
    REMOVE_USER_FAILED, 
    REMOVE_USER_SUCESS,
    RESET_CUSTOMER_REDUX_STATE
} from "../constant"
import {axiosAuth} from "./axios"

export const getAllCustomerInfo = () => async (dispatch) => {
    try {
        dispatch({type:FECH_CUSTOMER_INFO_REQUEST})
        const data = await axiosAuth().get('api/customer/info');
        
        console.log(data)
        dispatch({
            type:FECH_CUSTOMER_INFO_SUCESS, payload:{
                customers:data.data
            }
        })
    } catch (err) {
        console.log(`${err}`);
        dispatch({
            type: FECH_CUSTOMER_INFO_FAILED, payload: {
                error: err
            }
        });
    }

};

export const removeUser = (userId) => async (dispatch) => {
    try {
        const data = await axiosAuth().get(`api/user/remove`, userId);
        
        console.log(data)
        dispatch({
            type:REMOVE_USER_SUCESS, payload:{
                sucessMessage:data.data
            }
        })
    } catch (err) {
        console.log(`${err}`);
        dispatch({
            type: REMOVE_USER_FAILED, payload: {
                error: err
            }
        });
    }

};

export const resetCustomerReduxState = () => async (dispatch) => {
   dispatch({type:RESET_CUSTOMER_REDUX_STATE})
};
