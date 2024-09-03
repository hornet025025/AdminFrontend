import axios from "axios";
import { 
    BASE_URL,
    FORGOT_PASSWORD_REQUEST_FAILED, 
    FORGOT_PASSWORD_REQUEST_SUCESS,
    RESET_PASSWORD_REQUEST_SUCESS,
    RESET_PASSWORD_REQUEST_FAILED,
} from "../constant";

export const forgotPasswordRequest = (email) => async (dispatch) => {
    try {
      console.log('inside forgotPasswordRequest');
      const {data} = await axios.post(`${BASE_URL}api/password/forgot`, {email: email});
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_SUCESS,
        message : data.data
    });
    } catch (e) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST_FAILED,
            message : e.response.data.message
        });
    }
};

export const resetPasswordRequest = (resetPasswordDto) => async (dispatch) => {
    try {
      const data = await axios.post(`${BASE_URL}api/password/reset`, resetPasswordDto);
      console.log(data.data)
      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCESS,
        message : data.data
    });
    } catch (e) {
        dispatch({
            type: RESET_PASSWORD_REQUEST_FAILED,
            message : e.response.data.message
        });
    }
};