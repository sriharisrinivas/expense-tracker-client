import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VoiceInput from '../../VoiceInput/VoiceInput';
import { parseExpenseFromTextThunk } from '../../Redux/Action/MiscellaneousAction';
import { dispatchAlertWithAutoClose } from '../../Redux/helpers/reduxHelpers';
import { setVoiceInputTextAction } from '../../Redux/Action/VoiceInputAction';

function ChatAssistContent() {
  const dispatch = useDispatch();
  const voiceText = useSelector(state => state.voiceInputReducer.text);

  const checkGrammar = async () => {
    const res = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `text=${encodeURIComponent(voiceText)}&language=en-US`
    });

    const data = await res.json();

    let corrected = voiceText;

    data.matches.forEach(match => {
      if (match.replacements.length > 0) {
        const replacement = match.replacements[0].value;
        corrected =
          corrected.slice(0, match.offset) +
          replacement +
          corrected.slice(match.offset + match.length);
      }
    });

    dispatch(setVoiceInputTextAction(corrected));
  };


  const handleEnhance = async () => {
    if (!voiceText.trim()) {
      dispatchAlertWithAutoClose(dispatch, "Please enter text or speak to enhance the sentence", "error");

      return;
    }
    checkGrammar();
  };

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
        <button className='btn btn-outline-primary me-2' onClick={handleEnhance}>Enhance the sentence(AI)</button>
        <button className='btn btn-outline-success' onClick={handleExtract}>Extract</button>
      </div>
    </div>
  );
}

export default ChatAssistContent;