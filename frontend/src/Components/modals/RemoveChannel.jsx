import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actionsModal } from '../../slices/modalSlice.js';
import store from '../../slices/index.js';

const generateOnSubmit = ({
  modalInfo, disableButtons, enableButtons, notify, socket, onHide, t,
}) => (e) => {
  e.preventDefault();
  disableButtons();
  const channelIdToRemove = modalInfo.item;
  socket.emit('removeChannel', channelIdToRemove, (response) => {
    if (response && response.status === 'ok') {
      console.log(t('authForm.fetchingErrors.channelRemovingDelivered'));
      notify(t('authForm.fetchingErrors.channelRemovingDelivered'));
      enableButtons();
    } else {
      console.log(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
      notify(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
      enableButtons();
    }
  });
  onHide();
};

const Remove = (props) => {
  const { focusMessageInput } = props;
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
    focusMessageInput();
  };
  const { t } = useTranslation();
  const onSubmit = generateOnSubmit({ ...props, onHide, t });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>{t('modal.removeChannelText')}</h5>
        <form onSubmit={onSubmit}>
          <FormGroup>
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
