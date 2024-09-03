import { PROFIT_LOSS_FAILED, PROFIT_LOSS_SUCESS } from "../constant";
import { axiosAuth } from "./axios"

export const fetchProfitLoss = (userId) => async (dispatch) => {
   try {
   const data = await axiosAuth().get(`/api/trade/alltrades/${userId}`);
   dispatch({type: PROFIT_LOSS_SUCESS, payload: data});
   } catch(e) {
    dispatch({type: PROFIT_LOSS_FAILED, payload: e.message});
   }
}