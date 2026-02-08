import 'quill/dist/quill.snow.css'; // Add css for snow theme
import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import CreateNotesModel from '../../Components/CreateNotesModel/CreateNotesModel';
import { fetchNotes, updateSelectedNotes } from '../../Redux/Action/NotesAction';
import { CONSTANTS, modes } from '../../config';
import "./NotesPage.css";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function NotesPage() {

    const [fields, setFields] = useState({
        notes: ''
    });

    const [mode, setMode] = useState(1);
    
    const [tobeEditedNoteDetails, setTobeEditedNoteDetails] = useState({});

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link', 'image']
            ]
        },
        formats: [
            'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
            'header', 'list', 'ordered', 'bullet', 'check', 'script', 'indent',
            'direction', 'size', 'header', 'color', 'background', 'align',  'link', 'image'],
    });

    const [showCreateNotesModal, setShowCreateNotesModal] = useState(false);

    const dispatch = useDispatch();

    const notesState = useSelector(state => state.notesReducer);

    const userDetails = useSelector(state => state.userDetailsReducer);
    
    const onSelectNotes = (note) => {
        dispatch(updateSelectedNotes(note));

        if (note.id == "") {
            quill.clipboard.dangerouslyPasteHTML(`<p><span class="ql-size-large">Hi</span> <strong style="color: rgb(230, 0, 0);" class="ql-size-large">User</strong><strong style="color: rgb(230, 0, 0);">, </strong></p><p><br></p><h3 class="ql-indent-1">Please select/create a note from dropdown to use this editor. Please react out to us if you face any issue.</h3>`);
            return;
        }

        socket.emit('get-note-details', { id: note._id });

        socket.on('get-note-details', (msg) => {
            if (msg && msg.description) {
                // quillRef.current.firstChild.innerHTML = msg.description;
                quill.clipboard.dangerouslyPasteHTML(msg.description);
            } else {
                if (quill) {
                    quill.clipboard.dangerouslyPasteHTML('');
                }
            }
        });
    };

    const onEditName = (note) => { 
        setMode(2);
        setTobeEditedNoteDetails(note);
        setShowCreateNotesModal(true);
     }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setFields(pre => ({ ...pre, notes: quill.root.innerHTML }));
            });

            if (notesState.selectedNotesDetails.id == "") {
                quill.clipboard.dangerouslyPasteHTML(`<p><span class="ql-size-large">Hi</span> <strong style="color: rgb(230, 0, 0);" class="ql-size-large">User</strong><strong style="color: rgb(230, 0, 0);">, </strong></p><p><br></p><h3 class="ql-indent-1">Please select/create a note from dropdown to use this editor. Please react out to us if you face any issue.</h3></br /><h3>Kindly note that currently Image/Video attachments are not saving in mobile/tab devices </h3>`);
            }
        }
    }, [quill]);

    useEffect(() => {
        // Sending info to server
        let request = {
            id: notesState.selectedNotesDetails._id,
            title: notesState.selectedNotesDetails.title,
            description: fields.notes
        };
        socket.emit('update-notes', request);
    }, [fields.notes]);


    useEffect(() => {
        dispatch(fetchNotes());
    }, []);

    return (
        <Row className="main-content-container">
            {showCreateNotesModal &&
                <CreateNotesModel show={showCreateNotesModal} handleClose={() => {
                    setShowCreateNotesModal(false);
                    setMode(1);
                    setTobeEditedNoteDetails({});
                }
                } type={mode} 
                details={tobeEditedNoteDetails}/>
            }
            <Col className='content-container p-3 pt-4'>
                <Row style={{ gap: "10px" }}>
                    <Col sm="12" className='d-flex justify-content-between'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {notesState.selectedNotesDetails.title}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => onSelectNotes({ id: '', title: "Select Notes" })}>Select Notes</Dropdown.Item>
                                {notesState.notesList.map(note => (
                                    <>
                                        <Dropdown.Item onClick={() => onSelectNotes(note)} className='d-flex justify-content-between align-items-center' key={note.id}>
                                            <Form.Text>{note.title}</Form.Text>
                                            <i className='fa fa-edit ml-2' onClick={() => onEditName(note)}></i>
                                        </Dropdown.Item>
                                    </>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <button className='btn btn-primary' onClick={() => setShowCreateNotesModal(true)}>+ Add Notes</button>
                    </Col>

                    {/* {
                        notesState.selectedNotesDetails.id != "" &&
                        <Col sm="12">
                            <Form.Check type="checkbox" label={lockEditor ? "Unlock Editor" : "Lock Editor"} checked={lockEditor} onChange={() => setLockEditor(!lockEditor)} size='lg' />
                        </Col>
                    } */}

                    <Col sm="12" style={{ pointerEvents: (notesState.selectedNotesDetails.id == '') ? "none" : "auto" }}>
                        <div style={{ height: 460 }}>
                            <div ref={quillRef} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default NotesPage;