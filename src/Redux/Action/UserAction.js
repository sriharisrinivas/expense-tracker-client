import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import uploadFile from "../../helpers/helpers";

// Sync action to set user profile
export const setUserProfileAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_USER_DETAILS,
        payload: payload
    };
};

export const updateProfilePicture = (payload) => {
    return async (dispatch) => {

        dispatch(startLoaderAction());

        try {
            // Uploading file in cloudinary
            const uploadPhoto = await uploadFile(payload);

            // Updating profile picture in Mongo DB
            let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_PROFILE;
            await axios.put(url,
                { profilePic: uploadPhoto.url },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            );

            // Fetch updated profile
            const profileUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_PROFILE;
            const response = await axios.get(profileUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            dispatch(setUserProfileAction(response.data));
            dispatch(stopLoaderAction());
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
        }
    };
};
