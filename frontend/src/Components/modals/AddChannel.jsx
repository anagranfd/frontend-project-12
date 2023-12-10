import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { hideModal } from '../../slices/modalSlice.js';
// import socket from '../socket.js';
// import io from 'socket.io-client';

const generateOnSubmit = (
  {
    disableButtons, enableButtons, notify, filter, socket, onHide, t,
  },
  channels,
) => (values) => {
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
        console.log(t('authForm.fetchingErrors.newChannelDelivered'));
        notify(t('authForm.fetchingErrors.newChannelDelivered'));
        sessionStorage.setItem('currentChannelId', response.data.id);
        enableButtons();
      } else {
        console.log(t('authForm.fetchingErrors.newChannelDeliveryFailed'));
        notify(t('authForm.fetchingErrors.newChannelDeliveryFailed'));
        enableButtons();
      }
    });
  } else {
    console.log(t('authForm.fetchingErrors.channelAlreadyExists'));
    notify(t('authForm.fetchingErrors.channelAlreadyExists'));
    enableButtons();
  }
  onHide();
};

const AddChannel = (props) => {
  const { focusMessageInput } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(hideModal());
    focusMessageInput();
  };
  const channels = useSelector((state) => state.channels);
  console.log(channels);

  const NewChannelSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, t('authForm.validationErrors.usernameLettersMin'))
      .max(20, t('authForm.validationErrors.usernameLettersMax'))
      .required(t('authForm.validationErrors.requiredField')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: NewChannelSchema,
    onSubmit: generateOnSubmit({ ...props, onHide, t }, channels),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.addChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="body" className="visually-hidden">
              {t('modal.addChannelInputLabel')}
            </FormLabel>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              id="body"
              isInvalid={formik.touched.body && !!formik.errors.body}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.body}
            </FormControl.Feedback>
          </FormGroup>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value={t('modal.addChannelSubmitButton')}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
