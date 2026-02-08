import React from 'react';
import { Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import "./Profile.css";
import ProfilePictureUpload from '../ResetPassword/ProfilePictureUpload';

const Profile = () => {
    let userDetails = useSelector(state => state.userDetailsReducer);

    const items = [
        {
            label: 'First Name',
            span: {
                xl: 12,
                xxl: 12,
            },
            children: userDetails?.firstName,
        },
        {
            label: 'Last Name',
            span: {
                xl: 12,
                xxl: 12,
            },
            children: userDetails?.lastName,
        },
        {
            label: 'Gender',
            span: {
                xl: 12,
                xxl: 12,
            },
            children: userDetails?.gender == 1 ? "Male" : "Female",
        },
        // {
        //     label: 'Amount',
        //     children: '$80.00',
        // },
        {
            label: 'Email',
            span: {
                xl: 12,
                xxl: 12,
            },
            children: userDetails?.email,
        },
        // {
        //     label: 'Official',
        //     span: {
        //         xl: 2,
        //         xxl: 2,
        //     },
        //     children: '$60.00',
        // },
        // {
        //     label: 'Config Info',
        //     span: {
        //         xs: 1,
        //         sm: 2,
        //         md: 3,
        //         lg: 3,
        //         xl: 2,
        //         xxl: 2,
        //     },
        //     children: (
        //         <>
        //             Data disk type: MongoDB
        //             <br />
        //             Database version: 3.4
        //             <br />
        //             Package: dds.mongo.mid
        //         </>
        //     ),
        // },
        // {
        //     label: 'Hardware Info',
        //     span: {
        //         xs: 1,
        //         sm: 2,
        //         md: 3,
        //         lg: 3,
        //         xl: 2,
        //         xxl: 2,
        //     },
        //     children: (
        //         <>
        //             CPU: 6 Core 3.5 GHz
        //             <br />
        //             Storage space: 10 GB
        //             <br />
        //             Replication factor: 3
        //             <br />
        //             Region: East China 1
        //         </>
        //     ),
        // },
    ];

    return (
        <>
            <ProfilePictureUpload type='user' />
            <Descriptions
                title=""
                bordered
                column={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                items={items}
            />
        </>
    );
};
export default Profile;