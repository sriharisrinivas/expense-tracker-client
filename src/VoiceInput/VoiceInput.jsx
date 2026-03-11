import React from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setVoiceInputTextAction, clearVoiceInputTextAction } from "../Redux/Action/VoiceInputAction";

export default function VoiceInput() {
    const dispatch = useDispatch();
    const text = useSelector(state => state.voiceInputReducer.text);

    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = React.useState(true);

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({
            continuous: false,
            language: "en-IN",
        });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        dispatch(setVoiceInputTextAction(transcript));
    };

    return (
        <div style={container}>
            <input
                style={input}
                value={text}
                placeholder="Say something like 'Lunch 250'"
                onChange={(e) => dispatch(setVoiceInputTextAction(e.target.value))}
            />

            <button
                style={{
                    ...micButton,
                    backgroundColor: listening ? "#ef4444" : "#6366f1",
                }}
                onClick={() => {
                    if (isListening) {
                        startListening();
                    } else {
                        stopListening();
                    }
                    setIsListening(!isListening);
                }}
            >
                {
                    isListening ?
                        <FaMicrophone size={18} color="white" /> :
                        <FaStopCircle size={18} color="white" />
                }
            </button>
        </div>
    );
}

const container = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "150px",
};

const input = {
    flex: 1,
    height: "40px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const micButton = {
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
