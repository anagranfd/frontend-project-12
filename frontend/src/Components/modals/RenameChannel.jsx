import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { SocketContext } from '../../contexts/index.jsx';
import { actionsModal } from '../../slices/modalSlice.js';
import store from '../../slices/index.js';
import notify from '../../utils/notify.js';

const generateOnSubmit = (
  {
    disableButtons, enableButtons, renameChannel, modalInfo, onHide, t,
  },
  channels,
) => async (values) => {
  disableButtons();
  const newChannelName = filter.clean(values.body);
  const channelToRename = { ...modalInfo.item, name: newChannelName };
  if (
    !Object.values(channels.entities).find(
      ({ name }) => newChannelName === name,
    )
  ) {
    try {
      await renameChannel(channelToRename);
      notify(t('authForm.fetchingErrors.channelRenamingDelivered'));
    } catch (error) {
      notify(t('authForm.fetchingErrors.channelRenamingDeliveryFailed'));
    } finally {
      enableButtons();
    }
  } else {
    notify(t('authForm.fetchingErrors.channelAlreadyExists'));
    enableButtons();
  }
  onHide();
};

const Rename = (props) => {
  const onHide = () => {
    store.dispatch(actionsModal.hideModal());
  };
  const { t } = useTranslation();
  const modalInfo = useSelector((state) => state.modal);
  const { item } = modalInfo;
  const { renameChannel } = useContext(SocketContext);
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
    onSubmit: generateOnSubmit(
      {
        ...props,
        renameChannel,
        modalInfo,
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
