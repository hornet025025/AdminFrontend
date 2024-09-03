import { ADD_PROFIT_FAILED, ADD_PROFIT_RESET, ADD_PROFIT_SUCESS, BASE_URL } from "../constant";
import { axiosAuth } from "./axios";

export const applyProfitLoss = (profitLossDto) => async (dispatch) => {
    try {
        const data = await axiosAuth().post(`${BASE_URL}api/trade/addprofitloss`, profitLossDto);
        dispatch({
            type: ADD_PROFIT_SUCESS, payload: {
                data: data.data
            }
        });
    } catch (err) {
        console.log(`${err}`);
        dispatch({
            type: ADD_PROFIT_FAILED, payload: {
                error: err
            }
        });
    }

};

export const resetProfitLossReducer = () => async (dispatch) => {
    dispatch({type: ADD_PROFIT_RESET});
};