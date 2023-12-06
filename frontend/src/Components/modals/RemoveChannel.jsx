import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit = ({
  modalInfo, onHide, disableButtons, enableButtons, notify, t,
}) => (e) => {
  e.preventDefault();
  console.log(modalInfo);
  disableButtons();
  const channelIdToRemove = modalInfo.item;
  socket.emit('removeChannel', channelIdToRemove, (response) => {
    if (response && response.status === 'ok') {
      // setToastMessage(t('authForm.fetchingErrors.channelRemovingDelivered'));
      console.log(t('authForm.fetchingErrors.channelRemovingDelivered'));
      notify(t('authForm.fetchingErrors.channelRemovingDelivered'));
      enableButtons();
    } else {
      // setToastMessage(
      //   t('authForm.fetchingErrors.channelRemovingDeliveryFailed')
      // );
      console.log(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
      notify(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
      enableButtons();
    }
  });
  // console.log(messages);
  onHide();
};

const Remove = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();
  const onSubmit = generateOnSubmit({ ...props, t });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            {/* <input
              type="submit"
              className="btn btn-danger mt-2"
              value={t('modal.removeChannelSubmitButton')}
            /> */}
            <button type="submit" className="btn btn-danger mt-2">
              {t('modal.removeChannelSubmitButton')}
            </button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
