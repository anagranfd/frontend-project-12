import React, { useContext } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../contexts/index.jsx';
import { actionsModal } from '../../slices/modalSlice.js';
import store from '../../slices/index.js';
import notify from '../utils/notify.js';

const generateOnSubmit = ({
  modalInfo, disableButtons, enableButtons, removeChannel, onHide, t,
}) => async (e) => {
  e.preventDefault();
  disableButtons();
  const channelIdToRemove = modalInfo.item;
  try {
    await removeChannel(channelIdToRemove);
    console.log(t('authForm.fetchingErrors.channelRemovingDelivered'));
    notify(t('authForm.fetchingErrors.channelRemovingDelivered'));
  } catch (error) {
    console.log(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
    notify(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
  } finally {
    enableButtons();
  }
  onHide();
};

const Remove = (props) => {
  const { focusMessageInput } = props;
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
    focusMessageInput();
  };
  const { t } = useTranslation();
  const { removeChannel } = useContext(SocketContext);
  const onSubmit = generateOnSubmit({
    ...props,
    removeChannel,
    onHide,
    t,
  });

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
