import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";

// Helper function to auto-dismiss alerts after 3 seconds
const dispatchAlertWithAutoClose = (dispatch, message, type) => {
    dispatch(renderAlertMessageAction({
        message,
        type,
        show: true
    }));
    
    setTimeout(() => {
        dispatch(removeRenderAlertMsgAction());
    }, 3000);
};

// Thunk for user login
export const loginUserThunk = (loginFields, onSuccess) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.LOGIN;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(loginFields)
            });
            
            const parsedResponse = await response.json();
            
            if (response.status === 200) {
                sessionStorage.setItem("token", parsedResponse.token);
                dispatchAlertWithAutoClose(dispatch, "Login Successful.", "success");
                if (onSuccess) onSuccess(parsedResponse.token);
            } else {
                dispatchAlertWithAutoClose(dispatch, parsedResponse.message || "Login failed", "error");
            }
            
            dispatch(stopLoaderAction());
            return { success: response.status === 200, data: parsedResponse };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Error logging in", "error");
            return { success: false, error };
        }
    };
};

// Thunk for user registration
export const registerUserThunk = (signUpFields, onSuccess) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_USER;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(signUpFields)
            });
            
            const parsedResponse = await response.json();
            
            if (response.status === 201) {
                sessionStorage.setItem("token", parsedResponse.token);
                dispatchAlertWithAutoClose(dispatch, "Registration Successful. Redirecting to home page.", "success");
                if (onSuccess) onSuccess(parsedResponse.token);
            } else {
                dispatchAlertWithAutoClose(dispatch, parsedResponse.message || "Registration failed", "error");
            }
            
            dispatch(stopLoaderAction());
            return { success: response.status === 201, data: parsedResponse };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Error registering user", "error");
            return { success: false, error };
        }
    };
};

// Thunk for changing password
export const changePasswordThunk = (passwordData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CHANGE_PASSWORD;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(passwordData)
            });
            
            dispatch(stopLoaderAction());
            
            if (response.status === 200) {
                dispatchAlertWithAutoClose(dispatch, "Password changed successfully.", "success");
                return { success: true };
            } else {
                const data = await response.json();
                dispatchAlertWithAutoClose(dispatch, data.message || "Failed to change password", "error");
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Error changing password", "error");
            return { success: false, error };
        }
    };
};

// Thunk for generating OTP
export const generateOtpThunk = (email) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GENERATE_OTP;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify({ email })
            });
            
            dispatch(stopLoaderAction());
            
            if (response.status === 200) {
                dispatch(renderAlertMessageAction({
                    message: "OTP sent to your email.",
                    type: "success"
                }));
                return { success: true };
            } else {
                const data = await response.json();
                dispatch(renderAlertMessageAction({
                    message: data.message || "Failed to generate OTP",
                    type: "error"
                }));
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatch(renderAlertMessageAction({
                message: "Error generating OTP",
                type: "error"
            }));
            return { success: false, error };
        }
    };
};

// Thunk for verifying OTP
export const verifyOtpThunk = (otpData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.VERIFY_OTP;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(otpData)
            });
            
            dispatch(stopLoaderAction());
            
            if (response.status === 200) {
                dispatch(renderAlertMessageAction({
                    message: "OTP Verified. Redirecting to New Password Page.",
                    type: "success"
                }));
                return { success: true };
            } else {
                const data = await response.json();
                dispatch(renderAlertMessageAction({
                    message: data.message || "Failed to verify OTP",
                    type: "error"
                }));
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatch(renderAlertMessageAction({
                message: "Error verifying OTP",
                type: "error"
            }));
            return { success: false, error };
        }
    };
};

// Thunk for resetting password
export const resetPasswordThunk = (resetData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.RESET_PASSWORD;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(resetData)
            });
            
            dispatch(stopLoaderAction());
            
            if (response.status === 200) {
                dispatch(renderAlertMessageAction({
                    message: "Password Updated Successfully. Redirecting to login page.",
                    type: "success"
                }));
                return { success: true };
            } else {
                const data = await response.json();
                dispatch(renderAlertMessageAction({
                    message: data.message || "Failed to reset password",
                    type: "error"
                }));
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatch(renderAlertMessageAction({
                message: "Error resetting password",
                type: "error"
            }));
            return { success: false, error };
        }
    };
};
