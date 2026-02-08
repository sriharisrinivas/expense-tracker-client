import { Footer } from 'antd/es/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../helpers/socket-connections';
import { Input, Space } from 'antd';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import { fetchConversations, fetchFilteredConversations } from '../../Redux/Action/ChatAction';
import { ChatContext } from '../Home/home';

function FooterComponent() {

     const { expanded } = useContext(ChatContext);

     const dispatch = useDispatch();
     const chatState = useSelector(state => state.chatsReducer);
     const groupState = useSelector(state => state.groupChatReducer);
     const chatHelperState = useSelector(state => state.chatHelperReducer);

     const userDetails = useSelector(state => state.userDetailsReducer);

     const [message, setMessage] = useState("");

     const onSubmitMessage = async (e) => {
          e.preventDefault();
          switch (chatState.type) {
               case "Individual":
                    if (chatState?.selectedChatDetails) {
                         // dispatch(startLoaderAction());
                         await socket.emit('new-message', {
                              senderId: userDetails._id,
                              receiverId: chatState.selectedChatDetails.isNew ? chatState?.selectedChatDetails?._id : chatState.selectedChatDetails["receiverDetails"]._id,
                              message: message
                         });
                         removeChatTypingStatus();
                    }
                    break;
               case "Group":
                    if (groupState?.selectedGroupDetails) {
                         await socket.emit('new-group-msg', {
                              groupId: groupState.selectedGroupDetails._id,
                              message: message,
                              userId: userDetails._id,
                              userName: userDetails.firstName + " " + userDetails.lastName
                         });
                         removeGroupTypingStatus();
                    }
                    break;
               default:
                    setMessage("");
                    break;
          }

          setMessage("");
     };

     /** Chat Typing status code starts */

     const removeChatTypingStatus = () => {
          socket.emit('remove-chat-typing-status', {
               conversationId: chatState.selectedChatDetails._id,
               receiverId: chatState.selectedChatDetails?.["receiverDetails"]?._id,
               senderId: userDetails._id
          });
     };

     const chatTypingStatus = () => {
          if (message.length > 0) {
               socket.emit('add-chat-typing-status', {
                    conversationId: chatState.selectedChatDetails._id,
                    receiverId: chatState.selectedChatDetails["receiverDetails"]._id,
                    senderId: userDetails._id
               });
          } else {
               removeChatTypingStatus();
          }
     };

     useEffect(() => {
          let conversations = [...chatState.conversations];
          // By default typing status is false
          conversations.forEach((conversation) => {
               conversation.isTyping = false;
          });
          // Whenever the typing status changes making isTyping true

          chatHelperState?.chatTypingDetails?.map((item) => {
               conversations.forEach((conversation) => {
                    if (item.conversationId == conversation._id) {
                         conversation.isTyping = true;
                    } else {
                         conversation.isTyping = false;
                    }
               });
          });
          dispatch(fetchConversations(conversations));
          dispatch(fetchFilteredConversations(conversations));
     }, [chatHelperState.chatTypingDetails]);

     /** Chat Typing status code ends */
     /** Group Typing status code starts */

     const removeGroupTypingStatus = () => {
          let members = [...groupState.selectedGroupDetails.members];
          members = members.filter(item => item._id != userDetails._id);
          members = members.map(item => item._id);
          
          socket.emit('remove-group-typing-status', {
               groupId: groupState.selectedGroupDetails._id,
               members: members,
               senderId: userDetails._id
          });
     };

     const groupTypingStatus = () => {
          let members = [...groupState.selectedGroupDetails.members];
          members = members.filter(item => item._id != userDetails._id);
          members = members.map(item => item._id);

          if (message.length > 0) {
               socket.emit('add-group-typing-status', {
                    groupId: groupState.selectedGroupDetails._id,
                    members: members,
                    senderId: userDetails._id
               });
          } else {
               removeGroupTypingStatus();
          }
     };

     useEffect(() => {
          let groups = [...groupState.groupChats];
          // By default typing status is false
          groups.forEach((group) => {
               group.isTyping = false;
          });
          // Whenever the typing status changes making isTyping true

          chatHelperState?.groupTypingDetails?.map((item) => {
               groups.forEach((group) => {
                    if (item.groupId == group._id) {
                         group.isTyping = true;
                    } else {
                         group.isTyping = false;
                    }
               });
          });
          dispatch({
               type: REDUX_CONSTANTS.UPDATE_GROUP_CHATS,
               payload: groups
           });
           dispatch({
               type: REDUX_CONSTANTS.UPDATE_FILTERED_GROUP_CHATS,
               payload: groups
           });
     }, [chatHelperState.groupTypingDetails]);

     /** Group Typing status code ends */

     // This useEffect is to update latest typing status into store
     useEffect(() => {
          socket.on('get-chat-typing-statuses', (data) => {
               dispatch({
                    type: REDUX_CONSTANTS.UPDATE_CHAT_TYPING_DETAILS,
                    payload: data
               });
          });

          socket.on('get-group-typing-statuses', (data) => {
               console.log("data:", data)
               dispatch({
                    type: REDUX_CONSTANTS.UPDATE_GROUP_TYPING_DETAILS,
                    payload: data
               });
          });
     }, [socket]);

     // This useEffect is to trigger the typing status
     useEffect(() => {
          switch (chatState.type) {
               case "Individual":
                    if (!chatState?.selectedChatDetails.isNew) {
                         chatTypingStatus();
                    }
                    break;
               case "Group":
                    groupTypingStatus();
                    break;

               default:
                    break;
          }
     }, [message]);


     return (
          <Footer
               style={{ padding: '10px' }}
          >
               {
                    !expanded &&
                    <Space.Compact
                         style={{
                              width: '100%',
                              position: 'sticky',
                              bottom: 25,
                              zIndex: 1,
                         }}
                    >

                         {(Object.values(chatState.selectedChatDetails).length > 0 || Object.values(groupState.selectedGroupDetails).length > 0) &&
                              <form className='w-100' onSubmit={onSubmitMessage}>
                                   <div className='d-flex justify-content-between'>
                                        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter Message' />
                                        <button className='ms-1 btn btn-outline-primary' type="submit">
                                             <i className='fa fa-paper-plane'></i>
                                        </button>
                                   </div>
                              </form>
                         }

                    </Space.Compact>
               }

          </Footer>
     );
}

export default (FooterComponent);