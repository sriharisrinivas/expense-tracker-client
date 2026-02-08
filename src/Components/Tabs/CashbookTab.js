import React from 'react';

function CashbookTab() {
    return (
        <div>
            <>
                <h2>
                    <strong style={{ color: "rgb(102, 163, 224)" }}>Cashbook</strong>
                </h2>
                < br />
                <h3 className="ql-indent-1">
                    <span
                        style={{
                            fontSize: "16px"
                        }}
                    >
                        CashBook is a digital record keeping app using which you can add entries,
                        segregate records and find overall cash in / cash out & balance instantly.
                        {" "}
                    </span>
                </h3>
                < br />

                <h3 className="ql-indent-1">How to use?</h3>
                <ol>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Create cashbook by entering cashbook name and click on plus button to save the cashbook.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Select the saved cashbook from the list.
                    </li>
                    <li data-list="bullet" className="ql-indent-1">
                        <span className="ql-ui" contentEditable="false" />
                        Once after selecting the cashbook, you can add new entries by cash in or cash out buttons.
                    </li>
                </ol>
                < br />
            </>

        </div>
    );
}

export default CashbookTab;