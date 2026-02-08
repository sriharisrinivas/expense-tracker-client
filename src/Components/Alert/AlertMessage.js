import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible(props) {

  return (
    <>
      <Alert show={props.show} variant="success">
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>{props.message}</p>
        <hr />
      </Alert>
    </>
  );
}

export default AlertDismissible;