import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../Redux/Action/UserAction';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import uploadFile from '../../helpers/helpers';
import { socket } from '../../helpers/socket-connections';

const ProfilePictureUpload = ({ type = 'user' }) => {

  const dispatch = useDispatch();
  const uploadPhotoRef = useRef();

  let userDetails = useSelector(state => state.userDetailsReducer);
  let groupDetails = useSelector(state => state.groupChatReducer.selectedGroupDetails);

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (type == 'user') {
      dispatch(updateProfilePicture(file));
    } else {
      const uploadPhoto = await uploadFile(file);
      socket.emit('update-group-chat', { ...groupDetails, groupPic: uploadPhoto.url });
    }
  };

  return (
    <div className='d-flex flex-column align-items-center mb-2'>
      <AvatarComponent data={type == 'user' ? userDetails : groupDetails} size={100} />

      <label for="profile_pic" className="custom-file-upload mt-2">
        Upload
      </label>

      <input
        type='file'
        id='profile_pic'
        className='hidden'
        onChange={handleUploadPhoto}
        ref={uploadPhotoRef}
      />
    </div>
  );
};

export default ProfilePictureUpload;


