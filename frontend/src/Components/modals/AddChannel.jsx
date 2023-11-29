import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  ({ onHide }) =>
  (values) => {
    const newChannel = { name: values.body };
    console.log(newChannel);
    socket.emit('newChannel', newChannel, (response) => {
      if (response && response.status === 'ok') {
        console.log('Канал успешно добавлен сервером.');
      } else {
        console.log('Произошла ошибка при добавлении канала сервером.');
      }
    });
    onHide();
  };

const AddChannel = (props) => {
  const { onHide } = props;
  const f = useFormik({
    onSubmit: generateOnSubmit(props),
    initialValues: { body: '' },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
            />
          </FormGroup>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value="submit"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
