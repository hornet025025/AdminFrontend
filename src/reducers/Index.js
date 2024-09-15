import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import addProfitLossReducer from './AddProfitLossReducer';
import creditDebitRequestReducer from './CreditDebitRequestReducer';
import customerReducer from './CustomerReducer';
import { passwordResetReducer } from './ForgotPasswordReducer';
import tradeCategoryBalanceReducer from "./TradeCategoryBalanceReducer";
import profitLossReducer from "./ProfitLossReducer";
import notificationReducer from "./NotificationReducer";
import shiftAmountRequestReducer from "./ShiftAmountRequestReducer";

const reducers = combineReducers({
    authReducer,
    addProfitLossReducer,
    creditDebitRequestReducer,
    customerReducer,
    passwordResetReducer,
    tradeCategoryBalanceReducer,
    profitLossReducer,
    notificationReducer,
    shifts: shiftAmountRequestReducer
});

export default reducers