import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VoiceInput from '../../VoiceInput/VoiceInput';
import { parseExpenseFromTextThunk } from '../../Redux/Action/MiscellaneousAction';
import { dispatchAlertWithAutoClose } from '../../Redux/helpers/reduxHelpers';

function ChatAssistContent() {
  const dispatch = useDispatch();
  const voiceText = useSelector(state => state.voiceInputReducer.text);

  const handleExtract = () => {
    if (!voiceText.trim()) {
      dispatchAlertWithAutoClose(dispatch, "Please enter text or speak to extract expense details", "error");

      return;
    }
    dispatch(parseExpenseFromTextThunk(voiceText));
  };

  return (
    <div>

      <p>Hi, I'm your chat assistant! How can I help you today? At present, I can assist you with the following:</p>
      <ul>
        <li>Adding a new expense or income entry: You can tell me the amount, category, date, and any notes for the entry you want to add.</li>
      </ul>

      <br />
      <br />

      <VoiceInput />
      <div className='d-flex justify-content-end mt-3'>
        <button className='btn btn-outline-primary' onClick={handleExtract}>Extract</button>
      </div>
    </div>
  );
}

export default ChatAssistContent;