import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  ({ modalInfo, onHide }) =>
  (values) => {
    const channelIdToRename = { ...modalInfo.item, name: values.body };
    socket.emit('renameChannel', channelIdToRename, (response) => {
      if (response && response.status === 'ok') {
        console.log('Канал успешно перееименован сервером.');
      } else {
        console.log('Произошла ошибка при перееименовании канала сервером.');
      }
    });
    onHide();
  };

const Rename = (props) => {
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  const f = useFormik({
    onSubmit: generateOnSubmit(props),
    initialValues: item,
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Rename</Modal.Title>
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

export default Rename;
