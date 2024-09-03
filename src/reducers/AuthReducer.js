import {
  SIGN_IN_UP, 
  SIGN_UP_IN_FAILURE, 
  LOGOUT
} from "../constant"

const intialState={
    user:{},
    error:null,
    token:null,
    authenticate:false
};

const autReducer = (state = intialState, action) => {
    switch (action.type) {
      case SIGN_IN_UP:
        console.log(`Signinup ${action.type}`)
          state = {
              error:null,
              authenticate:true,
              user:action.payload.user,
              token:action.payload.token
          };
        break;  
      case LOGOUT:
          state = intialState;
          break;
      case SIGN_UP_IN_FAILURE:
        state={
          user:{},
          error:action.payload.error,
          authenticate:false,
          token:''
        };
        break; 
      default:
        break; 
    }
    return {
        ...state
       };
};

export default autReducer;

