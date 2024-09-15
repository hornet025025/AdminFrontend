import { ADD_PROFIT_FAILED, ADD_PROFIT_SUCESS, ADD_PROFIT_RESET } from "../constant";

  
  const intialState={
    successMessage:null,
      error:null,
  };
  
  const addProfitLossReducer = (state = intialState, action) => {
      switch (action.type) {
        case ADD_PROFIT_SUCESS:
          console.log(`Signinup ${action.type}`)
            state = {
              successMessage:action.payload.data,
                error:null
            };
          break;  
        case ADD_PROFIT_FAILED:
            state = {
                error:action.payload.error,
                successMessage:null
            };
            break;
        case ADD_PROFIT_RESET:
        state = intialState;
        break;
        default:
          break; 
      }
      return {
          ...state
         };
  };
  
  export default addProfitLossReducer;
  
  