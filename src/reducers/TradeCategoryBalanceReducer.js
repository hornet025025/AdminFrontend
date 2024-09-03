import { TRADE_CATEGORY_BALANCE_FAILED, TRADE_CATEGORY_BALANCE_SUCESS } from "../constant";

const intialState={
    tradeCatBal: [],
    error: ""
};

const tradeCategoryBalanceReducer = (state = intialState, action) => {
    console.log(action);
    switch (action.type) {
        case TRADE_CATEGORY_BALANCE_SUCESS:
            state.tradeCatBal = action.payload.data;
            break;
        case TRADE_CATEGORY_BALANCE_FAILED:
            state.error = action.payload.data;
            break;
        default:
            state = intialState;  
            break;  
    }

    return {
        ...state
       };
}

export default tradeCategoryBalanceReducer;

