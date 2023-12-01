import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  (
    { modalInfo, onHide, disableButtons, enableButtons, setToastMessage },
    channels
  ) =>
  (values) => {
    disableButtons();
    const newChannelName = values.body;
    const channelToRename = { ...modalInfo.item, name: newChannelName };
    if (
      !Object.values(channels.entities).find(
        ({ name }) => newChannelName === name
      )
    ) {
      socket.emit('renameChannel', channelToRename, (response) => {
        if (response && response.status === 'ok') {
          setToastMessage('Канал успешно перееименован сервером.');
          console.log('Канал успешно перееименован сервером.');
          enableButtons();
        } else {
          setToastMessage(
            'Произошла ошибка при перееименовании канала сервером.'
          );
          console.log('Произошла ошибка при перееименовании канала сервером.');
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

const Rename = (props) => {
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  const channels = useSelector((state) => state.channels);

  const f = useFormik({
    onSubmit: generateOnSubmit(props, channels),
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
