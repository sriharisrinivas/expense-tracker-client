import React from 'react';

function AboutTab() {
    return (
        <div>
            <>
                <h2>
                    <strong style={{ color: "rgb(102, 163, 224)" }}>About</strong>
                </h2>
                < br />

                <h3 className="ql-indent-1">Highlights of this website.</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can able to create/login into this website.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Upon successful login, user will be able to see list of tasks.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can able to create/update tasks based on category, severity etc...
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can able to filter tasks under All Tasks page.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can able to update password.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can track his/her expenses.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User can able to note down their thoughts in notes app.
                    </li>
                </ol>
                < br />

                <h3 className="ql-indent-1">Why use this application.</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Accounts are secure as we are storing encrypted passwords in our system.
                                        </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Validating user and providing access to account to respective user only.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        All in one application where user can create/update/delete tasks, track our expenses, view notes.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        User friendly interface. And having dark mode feature to make our application more visual comfort.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Responsive user interface for all devices like desktop, tablet and mobile.
                    </li>
                </ol>
            </>

        </div>
    );
}

export default AboutTab;