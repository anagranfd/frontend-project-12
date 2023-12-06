import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import socket from '../socket.js';
import io from 'socket.io-client';

const socket = io();

const generateOnSubmit = ({
  onHide, disableButtons, enableButtons, notify, filter, t,
}, channels) => (values) => {
  disableButtons();
  const newChannel = { name: filter.clean(values.body) };
  console.log(newChannel);
  // Object.values(channels.entities).find(({ name }) => console.log(name));
  if (
    !Object.values(channels.entities).find(
      ({ name }) => newChannel.name === name,
    )
  ) {
    socket.emit('newChannel', newChannel, (response) => {
      if (response && response.status === 'ok') {
        // setToastMessage(t('authForm.fetchingErrors.newChannelDelivered'));
        console.log(t('authForm.fetchingErrors.newChannelDelivered'));
        notify(t('authForm.fetchingErrors.newChannelDelivered'));
        enableButtons();
      } else {
        // setToastMessage(
        //   t('authForm.fetchingErrors.newChannelDeliveryFailed')
        // );
        console.log(t('authForm.fetchingErrors.newChannelDeliveryFailed'));
        notify(t('authForm.fetchingErrors.newChannelDeliveryFailed'));
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

const AddChannel = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  console.log(channels);

  const f = useFormik({
    onSubmit: generateOnSubmit({ ...props, t }, channels),
    initialValues: { body: '' },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.addChannelTitle')}</Modal.Title>
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
            value={t('modal.addChannelSubmitButton')}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
