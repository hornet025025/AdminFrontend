import {
    FECH_CUSTOMER_INFO_FAILED,
    FECH_CUSTOMER_INFO_SUCESS,
    REMOVE_USER_FAILED,
    REMOVE_USER_SUCESS,
    FECH_CUSTOMER_INFO_REQUEST,
    RESET_CUSTOMER_REDUX_STATE
  } from "../constant"
  
  const intialState={
      customers:[],
      loading:false,
      error:null,
      sucessMessage:""
  };
  
  const customerReducer = (state = intialState, action) => {
      switch (action.type) {
        case FECH_CUSTOMER_INFO_REQUEST:
          state.loading = true;
          break;
        case FECH_CUSTOMER_INFO_SUCESS:
          console.log(action.payload.customer)
          state = {
              customers:action.payload.customers,
              error:null,
              loading:false
            }
          break;
        case REMOVE_USER_SUCESS:
          state = {
            sucessMessage:action.payload.sucessMessage,
              error:null,
              loading:false
            }
          break;  
        case REMOVE_USER_FAILED:
        case FECH_CUSTOMER_INFO_FAILED:
          console.log(action.payload.error)
          state = {
              customer:[],
              error:action.payload.error,
              loading:false
            }
          break;
        case RESET_CUSTOMER_REDUX_STATE:
          state = intialState;
          break;
        default:
          break; 
      }
      return {
          ...state
         };
  };
  
  export default customerReducer;
  
  