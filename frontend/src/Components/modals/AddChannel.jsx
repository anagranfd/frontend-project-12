import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  ({ onHide, disableButtons, enableButtons, setToastMessage }, channels) =>
  (values) => {
    disableButtons();
    const newChannel = { name: values.body };
    console.log(newChannel);
    // Object.values(channels.entities).find(({ name }) => console.log(name));
    if (
      !Object.values(channels.entities).find(
        ({ name }) => newChannel.name === name
      )
    ) {
      socket.emit('newChannel', newChannel, (response) => {
        if (response && response.status === 'ok') {
          setToastMessage('Канал успешно добавлен сервером.');
          console.log('Канал успешно добавлен сервером.');
          enableButtons();
        } else {
          setToastMessage('Произошла ошибка при добавлении канала сервером.');
          console.log('Произошла ошибка при добавлении канала сервером.');
          enableButtons();
        }
      });
    } else {
      setToastMessage('Канал с таким именем уже существует.');
      console.log('Канал с таким именем уже существует.');
      enableButtons();
    }
    onHide();
  };

const AddChannel = (props) => {
  const { onHide } = props;
  const channels = useSelector((state) => state.channels);
  console.log(channels);

  const f = useFormik({
    onSubmit: generateOnSubmit(props, channels),
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
