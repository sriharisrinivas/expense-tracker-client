import React from 'react';

function TodoTab() {
    return (
        <div>
            <>
                <h2>
                    <strong style={{ color: "rgb(102, 163, 224)" }}>TODO</strong>
                </h2>
                < br /> 
                <h3 className="ql-indent-1">
                    <span
                        style={{
                            fontSize: "16px"
                        }}
                    >
                        A to-do list is just a list of things you have to-do. That means basically
                        anything and everything can be on your to-do list—but just because you’ve
                        written your to-dos down doesn’t mean your to-do list is actually useful.{" "}
                    </span>
                </h3>
               < br />
                <h3 className="ql-indent-1">
                    <span
                        style={{
                            fontSize: "16px"
                        }}
                    >
                        Effectively tracking when your work is due can help you prioritize and get
                        great work done. But too often, that list of work to-dos is disorganized
                        and disconnected from the actual work you’re doing—which leads to less
                        clarity and more work about work.
                    </span>
                </h3>
                < br />

                <h3 className="ql-indent-1">Features of this Todo:</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Create day to day tasks and keep track of them.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Update task details or update status of the task.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Filter tasks based on search filters in all tasks page.
                    </li>
                </ol>
                < br />

                <h3 className="ql-indent-1">Coming Features</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Calendar Sync.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Reminders.
                    </li>
                </ol>
            </>

        </div>
    );
}

export default TodoTab;