import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  ({ modalInfo, onHide, disableButtons, enableButtons, setToastMessage }) =>
  (e) => {
    e.preventDefault();
    console.log(modalInfo);
    disableButtons();
    const channelIdToRemove = modalInfo.item;
    socket.emit('removeChannel', channelIdToRemove, (response) => {
      if (response && response.status === 'ok') {
        setToastMessage('Канал успешно удален сервером.');
        console.log('Канал успешно удален сервером.');
        enableButtons();
      } else {
        setToastMessage('Произошла ошибка при удалении канала сервером.');
        console.log('Произошла ошибка при удалении канала сервером.');
        enableButtons();
      }
    });
    // console.log(messages);
    onHide();
  };

const Remove = (props) => {
  const { onHide } = props;
  const onSubmit = generateOnSubmit(props);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Вы хотите удалить канал?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <input
              type="submit"
              className="btn btn-danger mt-2"
              value="remove"
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
