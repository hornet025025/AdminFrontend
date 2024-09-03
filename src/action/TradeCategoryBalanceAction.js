import { TRADE_CATEGORY_BALANCE_FAILED, TRADE_CATEGORY_BALANCE_SUCESS } from "../constant";
import { axiosAuth } from "./axios"

export const getAllCategoryBalance = (userId) => async (dispatch) => {
   try {
      console.log(userId);
   const data = await axiosAuth().get(`api/tcbalance/balance/${userId}`);
   dispatch({type: TRADE_CATEGORY_BALANCE_SUCESS, payload: data});
   } catch(e) {
    dispatch({type: TRADE_CATEGORY_BALANCE_FAILED, payload: e.message});
   }
}