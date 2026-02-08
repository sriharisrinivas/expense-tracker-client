import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { TextField } from '@mui/material';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { socket } from '../../helpers/socket-connections';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CreateGroup({ handleCancel }) {
    const theme = useTheme();

    const dispatch = useDispatch();

    const [groupName, setGroupName] = React.useState('');
    const [members, setMembers] = React.useState([]);
    const chatState = useSelector(state => state.chatsReducer);

    const handleChange = (event) => {
        const { target: { value }, } = event;
        setMembers(value);
    };

    const validateForm = () => {

        if (groupName === '') {
            dispatch(renderAlertMessageAction({
                message: "Group Name  is required",
                type: "error",
                show: true
            }));
            return false;
        }

        if (members.length < 2) {
            dispatch(renderAlertMessageAction({
                message: "Select atleast 2 users",
                type: "error",
                show: true
            }));
            return false;
        }

        return true;

    };

    const onCreateGroup = () => {

        let isValidate = validateForm();
        if (isValidate) {

            let userIds = members.map(user => user._id);
            socket.emit('create-group', {
                token: sessionStorage.getItem("token"),
                groupName,
                members: userIds
            });
            handleCancel();
        }

    };

    return (
        <div>

            <TextField id="outlined-basic" className='m-2 w-100' label="Group Name" variant="outlined"
                name="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />

            <FormControl sx={{ m: 1, width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Select Users</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={members}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Select Users" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value.firstName + " " + value.lastName} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {chatState.searchedChats.map((item) => (
                        <MenuItem
                            key={item._id}
                            value={item}
                        >
                            {item.firstName + " " + item.lastName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <br />

            <div className=' mt-4 mb-4 d-flex justify-content-center'>
                <Button onClick={onCreateGroup}>Create Group</Button>
            </div>
        </div>
    );
}
