import { PROFIT_LOSS_FAILED, PROFIT_LOSS_SUCESS } from "../constant";

const intialState={
    profitLossRecords: null,
    error: null
};

const profitLossReducer = (state = intialState, action) => {
    console.log(action);
    switch (action.type) {
        case PROFIT_LOSS_SUCESS:
            state.profitLossRecords = action.payload.data;
            break;
        case PROFIT_LOSS_FAILED:
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

export default profitLossReducer;

