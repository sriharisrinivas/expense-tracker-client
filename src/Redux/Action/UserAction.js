import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import uploadFile from "../../helpers/helpers";

export const getProfileAction = () => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_PROFILE;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch({
                type: REDUX_CONSTANTS.UPDATE_USER_DETAILS,
                payload: response.data
            });
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
        dispatch(stopLoaderAction());
    };
};

export const updateProfilePicture = (payload) => {
    return async (dispatch) => {

        dispatch(startLoaderAction());

        // Uploading file in cloudinary
        const uploadPhoto = await uploadFile(payload);

        // Updating profile picture in Mongo DB
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_PROFILE;
        axios.put(url,
            { profilePic: uploadPhoto.url },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((response) => {
                dispatch(getProfileAction());
            }).catch((error) => {
                console.log(error);
            });
        dispatch(stopLoaderAction());
    };
};
