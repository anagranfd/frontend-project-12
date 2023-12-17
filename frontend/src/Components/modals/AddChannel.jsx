import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import notify from '../../utils/notify.js';
import { SocketContext } from '../../contexts/index.jsx';
import { actionsModal } from '../../slices/modalSlice.js';
import { actionsChannels } from '../../slices/channelsSlice.js';
import store from '../../slices/index.js';

const generateOnSubmit = ({
  disableButtons, enableButtons, createChannel, onHide, t,
}, channels) => async (values) => {
  disableButtons();
  const newChannel = { name: filter.clean(values.body) };
  if (
    !Object.values(channels.entities).find(
      ({ name }) => newChannel.name === name,
    )
  ) {
    try {
      await createChannel(newChannel).then((data) => {
        sessionStorage.setItem('currentChannelId', data.id);
        if (
          sessionStorage.getItem('currentChannelId')
            && Number(sessionStorage.getItem('currentChannelId')) === data.id
        ) {
          store.dispatch(
            actionsChannels.setCurrentChannel({
              channelId: data.id,
            }),
          );
        }
      });
      notify(t('authForm.fetchingErrors.newChannelDelivered'));
    } catch (error) {
      notify(t('authForm.fetchingErrors.newChannelDeliveryFailed'));
    } finally {
      enableButtons();
    }
  } else {
    notify(t('authForm.fetchingErrors.channelAlreadyExists'));
    enableButtons();
  }
  onHide();
};

const AddChannel = (props) => {
  const { t } = useTranslation();
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
  };
  const channels = useSelector((state) => state.channels);
  const { createChannel } = useContext(SocketContext);

  const NewChannelSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, t('authForm.validationErrors.usernameLettersMin'))
      .max(20, t('authForm.validationErrors.usernameLettersMax'))
      .required(t('authForm.validationErrors.requiredField')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: NewChannelSchema,
    onSubmit: generateOnSubmit(
      {
        ...props,
        createChannel,
        onHide,
        t,
      },
      channels,
    ),
    validateOnBlur: false,
    validateOnChange: false,
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
