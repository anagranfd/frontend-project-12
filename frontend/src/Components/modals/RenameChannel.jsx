import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { actionsModal } from '../../slices/modalSlice.js';
import store from '../../slices/index.js';

const generateOnSubmit = (
  {
    modalInfo,
    disableButtons,
    enableButtons,
    notify,
    filter,
    socket,
    onHide,
    t,
  },
  channels,
) => (values) => {
  disableButtons();
  const newChannelName = filter.clean(values.body);
  const channelToRename = { ...modalInfo.item, name: newChannelName };
  if (
    !Object.values(channels.entities).find(
      ({ name }) => newChannelName === name,
    )
  ) {
    socket.emit('renameChannel', channelToRename, (response) => {
      if (response && response.status === 'ok') {
        console.log(t('authForm.fetchingErrors.channelRenamingDelivered'));
        notify(t('authForm.fetchingErrors.channelRenamingDelivered'));
        enableButtons();
      } else {
        console.log(
          t('authForm.fetchingErrors.channelRenamingDeliveryFailed'),
        );
        notify(t('authForm.fetchingErrors.channelRenamingDeliveryFailed'));
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

const Rename = (props) => {
  const { modalInfo, focusMessageInput } = props;
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
    focusMessageInput();
  };
  const { t } = useTranslation();
  const { item } = modalInfo;
  const channels = useSelector((state) => state.channels);

  const RenameChannelSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, t('authForm.validationErrors.usernameLettersMin'))
      .max(20, t('authForm.validationErrors.usernameLettersMax'))
      .required(t('authForm.validationErrors.requiredField')),
  });

  const formik = useFormik({
    initialValues: item,
    validationSchema: RenameChannelSchema,
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
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
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
            value={t('modal.renameChannelSubmitButton')}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
