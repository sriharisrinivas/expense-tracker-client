import React, { useState } from 'react';
import { Button, Modal } from 'antd';


const ReusableModal = ({ isModalOpen, handleOk, handleCancel, title, children, footer, width }) => {

    return (
        <>
            <Modal width={width ? width : 'auto'} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={footer}>
                {children}
            </Modal>
        </>
    );
};
export default ReusableModal;