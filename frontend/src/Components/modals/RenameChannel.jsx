import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit =
  (
    { modalInfo, onHide, disableButtons, enableButtons, notify, filter, t },
    channels
  ) =>
  (values) => {
    disableButtons();
    const newChannelName = filter.clean(values.body);
    const channelToRename = { ...modalInfo.item, name: newChannelName };
    if (
      !Object.values(channels.entities).find(
        ({ name }) => newChannelName === name
      )
    ) {
      socket.emit('renameChannel', channelToRename, (response) => {
        if (response && response.status === 'ok') {
          // setToastMessage(
          //   t('authForm.fetchingErrors.channelRenamingDelivered')
          // );
          console.log(t('authForm.fetchingErrors.channelRenamingDelivered'));
          notify(t('authForm.fetchingErrors.channelRenamingDelivered'));
          enableButtons();
        } else {
          // setToastMessage(
          //   t('authForm.fetchingErrors.channelRenamingDeliveryFailed')
          // );
          console.log(
            t('authForm.fetchingErrors.channelRenamingDeliveryFailed')
          );
          notify(t('authForm.fetchingErrors.channelRenamingDeliveryFailed'));
          enableButtons();
        }
      });
    } else {
      // setToastMessage(t('authForm.fetchingErrors.channelAlreadyExists'));
      console.log(t('authForm.fetchingErrors.channelAlreadyExists'));
      notify(t('authForm.fetchingErrors.channelAlreadyExists'));
      enableButtons();
    }
    onHide();
  };

const Rename = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const { item } = modalInfo;
  const channels = useSelector((state) => state.channels);

  const f = useFormik({
    onSubmit: generateOnSubmit({ ...props, t }, channels),
    initialValues: item,
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="body" className="visually-hidden">
              {t('modal.addChannelInputLabel')}
            </FormLabel>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
              id="body"
            />
          </FormGroup>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value={t('modal.renameChannelSubmitButton')}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
