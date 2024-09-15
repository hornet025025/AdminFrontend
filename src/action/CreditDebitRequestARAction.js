import { ACCEPT_REJECT_CREDIT_DEBIT_FAILED, ACCEPT_REJECT_CREDIT_DEBIT_SUCESS, BASE_URL, FETCH_TRANSACTION_BY_USER_ID_FAILED, FETCH_TRANSACTION_BY_USER_ID_SUCESS, GET_CREDIT_DEBIT_FAILED, GET_CREDIT_DEBIT_SUCESS } from "../constant"
import { axiosAuth } from "./axios"

export const getCreditDebitRequest  = () => async (dispatch)=> {
    try {
        const data = await axiosAuth().get(`api/transaction/alltransaction`);
        console.log(data)
        dispatch({
            type: GET_CREDIT_DEBIT_SUCESS, payload: {
                data: data.data
            }
        });
    } catch (err) {
        dispatch({
            type: GET_CREDIT_DEBIT_FAILED, payload: {
                error: err
            }
        });
    }
}

export const acceptRejectRequest  = (reqDto) => async (dispatch)=> {
    try {
        console.log(reqDto);
        const data = await axiosAuth().post(`api/transaction/acceptreject`, reqDto);
        dispatch({
            type: ACCEPT_REJECT_CREDIT_DEBIT_SUCESS, payload: {
                data: data
            }
        });
    } catch (err) {
        dispatch({
            type: ACCEPT_REJECT_CREDIT_DEBIT_FAILED, payload: {
                error: err
            }
        });
    }
};

export const getAllTransaction = userId => async (dispatch) => {
    try {
        const { data } = await axiosAuth().get(`api/transaction/alltransaction/${userId}`);
        dispatch(
            {
                type: FETCH_TRANSACTION_BY_USER_ID_SUCESS,
                payload: data
            }
        );
    } catch (e) {
        dispatch(
            {
                type: FETCH_TRANSACTION_BY_USER_ID_FAILED,
                payload: e.message
            }
        );
    }
};