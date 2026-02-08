
import React, { useEffect, useMemo, useState } from 'react';
import "./GridViewPage.css";
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { fetchTodos } from '../../Redux/Action/TodosAction';
import { API_END_POINTS, CONSTANTS, STATUSES } from '../../config';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import AddTaskComponent from '../../Components/AddTaskComponent/AddTaskComponent';
// import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';

function GridViewPage() {
    let contentDynamicHeight = useSelector(state => state.SideBarReducer.dynamicContentContainerHeight);

    const todosList = useSelector(state => state.todosListReducer.todosList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const [selectedRowDetails, setSelectedRowDetails] = useState(undefined);

    let searchObj = useSelector(state => state.todosListReducer.searchObj);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onUpdateTask = async (item, isDelete = false) => {
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_TODO;

        let payload = {
            task: item["task"],
            description: item["description"] ? item["description"] : "",
            status: item["status"] == STATUSES.COMPLETED ? STATUSES.NEW : STATUSES.COMPLETED,
            severity: item["severity"],
            category: item["category"],
            dueDate: new Date(item["dueDate"]),
            _id: item["_id"]
        };

        if (isDelete) {
            payload.status = 3;
        }

        let options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };

        dispatch(startLoaderAction());
        await fetch(url, options);
        dispatch(stopLoaderAction());
        dispatch(fetchTodos(searchObj));

    };

    const onToggleStatus = (item) => {
        onUpdateTask(item);
    };

    const onDeleteTask = (item) => {
        onUpdateTask(item, true);
    };

    const callBack = () => {
        handleClose();
        setSelectedRowDetails(undefined);
    };

    const onEditTask = (item) => {
        setSelectedRowDetails(item);
        setShow(true);
    };

    const Actions = (params) => {
        return <div className='d-flex'>
            {
                params.data["status"] != STATUSES.DELETED &&
                <div className='ms-2 mt-1'>
                    <i disabled={params.data["status"] != STATUSES.NEW} className='fa fa-edit mt-1' onClick={() => { onEditTask(params.data); }}></i>
                </div>
            }

            {
                params.data["status"] == STATUSES.NEW &&
                <div className='ms-2 mt-1'>
                    <i className='fa fa-trash mt-1' onClick={() => { onDeleteTask(params.data); }}></i>
                </div>
            }
        </div>;
    };

    const CheckBoxRenderer = (params) => {
        return <div className='mt-2'>
            {params.data["status"] != 3 &&
                <Form.Check checked={params.data["status"] == STATUSES.COMPLETED} onChange={() => onToggleStatus(params.data)} />
            }
        </div>;
    };

    let colDefs = [
        { field: "", width: 50, cellRenderer: CheckBoxRenderer },
        { headerName: 'Title', field: "task", tooltipField: 'task' },
        { headerName: 'Description', field: "description", tooltipField: 'description' },
        { headerName: 'Severity', field: "severity", tooltipField: 'severity' },
        { headerName: 'Status', field: "status", tooltipField: 'status' },
        { headerName: 'Category', field: "category", tooltipField: 'category' },
        { headerName: 'Due Date', field: "formattedDueDate", tooltipField: 'formattedDueDate' },
        { headerName: 'Actions', field: '', cellRenderer: Actions, pinned: "right", width: 100 }
    ];

    const getRowStyle = (params) => {
        if (params.data["status"] == STATUSES.NEW) {
            return { background: "#FFC96F" };
        } else if (params.data["status"] == STATUSES.COMPLETED) {
            return { background: "#ACD793" };
        } else {
            return { background: "#EE4E4E" };
        }
    };

    const defaultColDef = useMemo(() => {
        return {
            filter: true
        };
    });

    const darkModeState = useSelector(state => state.darkModeReducer.isDarkMode);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTaskComponent selectedRowDetails={selectedRowDetails} callBack={callBack} />
                </Modal.Body>
            </Modal>
            <Row className="main-content-container">
                <Col className='content-container pt-3'>
                    <p className='login-main-title text-center m-0 grid-view-page-suggestion'>Open in desktop version for better view .</p>

                    <div
                        className={`${darkModeState ? "ag-theme-quartz-dark" : "ag-theme-quartz"}`} // applying the grid theme
                        style={{ height: 600 }} // the grid will fill the size of the parent container
                    >
                        <AgGridReact
                            rowData={todosList}
                            columnDefs={colDefs}
                            // pagination={true}
                            defaultColDef={defaultColDef}
                            // getRowStyle={getRowStyle}
                            frameworkComponents={
                                {
                                    Actions: Actions,
                                    CheckBoxRenderer: CheckBoxRenderer
                                }
                            }
                        />
                    </div>

                </Col>
            </Row>
        </>

    );
}

export default GridViewPage;