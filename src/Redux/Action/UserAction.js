import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";
import uploadFile from "../../helpers/helpers";

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

// Helper function to get auth headers
const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});

// Sync action to set user profile
export const setUserProfileAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_USER_DETAILS,
        payload: payload
    };
};

// Thunk for fetching user profile
export const fetchUserProfileThunk = () => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_PROFILE;
            const response = await axios.get(url, {
                headers: getAuthHeaders()
            });
            
            dispatch(setUserProfileAction(response.data?.user || response.data));
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to fetch user profile", "error");
            return { success: false, error };
        }
    };
};

// Thunk for updating profile picture
export const updateProfilePictureThunk = (payload) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            // Uploading file in cloudinary
            const uploadPhoto = await uploadFile(payload);

            // Updating profile picture in Mongo DB
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_PROFILE;
            await axios.put(url,
                { profilePic: uploadPhoto.url },
                {
                    headers: getAuthHeaders()
                }
            );

            // Fetch updated profile
            const profileUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_PROFILE;
            const response = await axios.get(profileUrl, {
                headers: getAuthHeaders()
            });

            dispatch(setUserProfileAction(response.data));
            dispatchAlertWithAutoClose(dispatch, "Profile picture updated successfully.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to update profile picture", "error");
            return { success: false, error };
        }
    };
};

// Legacy thunk for backward compatibility
export const updateProfilePicture = (payload) => {
    return updateProfilePictureThunk(payload);
};
