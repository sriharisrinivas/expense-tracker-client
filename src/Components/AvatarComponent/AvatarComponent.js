import { Avatar } from 'antd';
import React, { useState } from 'react';
import ReusableModal from '../ReusableModal/ReusableModal';

function AvatarComponent({ data, size }) {

    const [previewOpen, setPreviewOpen] = useState(false);

    const onPreview = () => {
        setPreviewOpen(true);
    };

    const renderDefaultImage = () => {
        return data.gender == "1" ? <img src="/male.png" /> : <img src="/female.png" />;
    };

    return (
        <>
            <ReusableModal isModalOpen={previewOpen} handleCancel={() => setPreviewOpen(false)}
                title="Profile Image" footer={null} width={600}
                children={
                    <div className='d-flex justify-content-center'>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            size={300}
                            icon={data?.profilePic !== '' ? <img src={data?.profilePic} /> : renderDefaultImage()}
                        />
                    </div>
                } />
            <Avatar
                style={{ cursor: 'pointer' }}
                size={size}
                onClick={onPreview}
                icon={data?.profilePic !== '' ? <img src={data?.profilePic} /> : renderDefaultImage()}
            />
        </>
    );
}

export default AvatarComponent;