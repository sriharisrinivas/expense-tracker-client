import React from 'react';

function NotesTab() {
    return (
        <div>
            <>
                <h2>
                    <strong style={{ color: "rgb(102, 163, 224)" }}>Notes</strong>
                </h2>
                < br /> 
                <h3 className="ql-indent-1">
                    <span
                        style={{
                            fontSize: "16px"
                        }}
                    >
                       Notes apps provide a convenient way to write down ideas, reminders, 
                       and information anytime, anywhere, using smartphones, tablets, or computers.
                       
                       Using this Notes app, you can create notes, edit them.{" "}
                    </span>
                </h3>
               < br />

                <h3 className="ql-indent-1">Features of this Notes app:</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Create New Notes bt clicking on add notes button.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Select the notes from the dropdown list.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Select Lock Editor/Unlock Editor to lock or unlock the editor in order to avoid unnecessary editing.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Start jotting down your thoughts, ideas in the editor. Notes will automatically saved in the cloud.
                    </li>
                </ol>
            </>

        </div>
    );
}

export default NotesTab;