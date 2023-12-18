import React, { useContext } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../contexts/index.jsx';
import { actionsModal } from '../../slices/modalSlice.js';
import { actionsChannels } from '../../slices/channelsSlice.js';
import store from '../../slices/index.js';
import notify from '../../utils/notify.js';

const generateOnSubmit = ({
  disableButtons,
  enableButtons,
  removeChannel,
  modalInfo,
  channelsState,
  onHide,
  t,
}) => async (e) => {
  e.preventDefault();
  disableButtons();
  const channelIdToRemove = modalInfo.item;
  try {
    await removeChannel(channelIdToRemove).then(() => {
      if (channelsState.currentChannelId === channelIdToRemove.id) {
        store.dispatch(
          actionsChannels.setCurrentChannel({
            channelId: channelsState.ids[0],
          }),
        );
        sessionStorage.setItem('currentChannelId', channelsState.ids[0]);
      }
    });
    notify(t('authForm.fetchingErrors.channelRemovingDelivered'));
  } catch (error) {
    notify(t('authForm.fetchingErrors.channelRemovingDeliveryFailed'));
  } finally {
    enableButtons();
  }
  onHide();
};

const Remove = (props) => {
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
  };
  const { t } = useTranslation();
  const { removeChannel } = useContext(SocketContext);
  const modalInfo = useSelector((state) => state.modal);
  const channelsState = useSelector((state) => state.channels);
  const onSubmit = generateOnSubmit({
    ...props,
    removeChannel,
    modalInfo,
    channelsState,
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
