import { ACCEPT_REJECT_CREDIT_DEBIT_FAILED, ACCEPT_REJECT_CREDIT_DEBIT_SUCESS, FETCH_TRANSACTION_BY_USER_ID_FAILED, FETCH_TRANSACTION_BY_USER_ID_SUCESS, GET_CREDIT_DEBIT_FAILED, GET_CREDIT_DEBIT_SUCESS} from "../constant";

const intial_state = {
    creditDebitRequests: [],
    userCreditDebitRequests: [],
    error: null,
    aceptRejectMessage: null,
};

const creditDebitRequestReducer = (state = intial_state, action) => {
    switch (action.type) {
        case GET_CREDIT_DEBIT_SUCESS:
            state = {
                creditDebitRequests : action.payload.data,
                error : null,
                aceptRejectMessage: null,
                userCreditDebitRequests:[]
            }
            break;    
        case GET_CREDIT_DEBIT_FAILED:
            state = {
                creditDebitRequests : [],
                error : action.payload.error,
                aceptRejectMessage: null,
                userCreditDebitRequests:[]
            }
            break;  
        case ACCEPT_REJECT_CREDIT_DEBIT_SUCESS:
            state = {
                creditDebitRequests : [],
                error : null,
                aceptRejectMessage: action.payload.data,
                userCreditDebitRequests:[]
            }
            break; 
        case ACCEPT_REJECT_CREDIT_DEBIT_FAILED:
            state = {
                creditDebitRequests : [],
                error : action.payload.error,
                aceptRejectMessage: null,
                userCreditDebitRequests:[]
            }
            break;   
        case FETCH_TRANSACTION_BY_USER_ID_SUCESS:
            state = {
                creditDebitRequests : [],
                error : null,
                aceptRejectMessage: null,
                userCreditDebitRequests: action.payload
            }
            break;
        case FETCH_TRANSACTION_BY_USER_ID_FAILED:
            state = {
                creditDebitRequests : [],
                error : action.payload,
                aceptRejectMessage: null,
                userCreditDebitRequests:[]
            }
            break;
        default:
            break; 
    }
    return {
        ...state
       };
}

export default creditDebitRequestReducer;