import {
    FORGOT_PASSWORD_REQUEST_SUCESS,
    FORGOT_PASSWORD_REQUEST_FAILED, 
    RESET_PASSWORD_REQUEST_FAILED,
    RESET_PASSWORD_REQUEST_SUCESS
} from "../constant";


const intialState = {
    forgotMessage:'',
    resetMessage:'',
    isforgot:false,
    isReset:false
};

export const passwordResetReducer = (state = intialState, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST_SUCESS:
          state.forgotMessage = action.message;
          state.isforgot = true;
          break;
        case FORGOT_PASSWORD_REQUEST_FAILED:    
          state.forgotMessage = action.message;
          state.isforgot = false;
          break;
        case RESET_PASSWORD_REQUEST_SUCESS:
          state.resetMessage = action.message;
          console.log(state.resetMessage)
          state.isReset = true;
          break; 
        case RESET_PASSWORD_REQUEST_FAILED: 
          state.isReset = false;   
          state.resetMessage = action.message;
          break;  
        default:
          break;
    }
    return {
        ...state
    }
};

export default passwordResetReducer;