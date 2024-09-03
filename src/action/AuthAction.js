import axios from "axios"
import { 
    SIGN_IN_UP, 
    SIGN_UP_IN_FAILURE,
    LOGOUT
} from "../constant"
import { BASE_URL } from "../constant"

export const SignUp = (userData) => async (dispatch) => {
    try {
        const data = await axios.post(`${BASE_URL}api/user/signup`, userData);
        saveData(data, dispatch);
    } catch (err) {
        console.log(`${err}`);
        dispatch({
            type: SIGN_UP_IN_FAILURE, payload: {
                error: err
            }
        });
    }

};


export const SignIn = (userData) => async dispatch => {
    try {
        const data = await axios.post(`${BASE_URL}api/user/signin`, userData);
        saveData(data, dispatch);
    } catch (err) {
        console.log(`error ${err}`)
        dispatch({
            type: SIGN_UP_IN_FAILURE, payload: {
                error: err
            }
        });
    }
}

const saveData = (data, dispatch) => {
    if (data.status === 200) {
        const user = data.data
        console.log(data)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', user.authorization)
        dispatch({
            type: SIGN_IN_UP, payload: {
                user,
                token: user.authorization
            }
        });

    } else {
        dispatch({
            type: SIGN_UP_IN_FAILURE, payload: {
                error: data.error
            }
        });
    }
}

export const logoutUser = () => async dispatch => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
}