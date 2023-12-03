import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

export const Signup = ({ notify, toastContainer }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('authForm.validationErrors.usernameLettersMin'))
      .max(20, t('authForm.validationErrors.usernameLettersMax'))
      .required(t('authForm.validationErrors.requiredField')),
    password: Yup.string()
      .min(4, t('authForm.validationErrors.passwordLettersMin'))
      .max(50, t('authForm.validationErrors.passwordLettersMax'))
      .required(t('authForm.validationErrors.requiredField')),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        t('authForm.validationErrors.confirmationFailed')
      )
      .required(t('authForm.validationErrors.confirmationRequired')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        // console.log(routes.loginPath());
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        console.log(JSON.stringify(res.data));
        navigate(routes.mainPagePath());
      } catch (err) {
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (err.isAxiosError && err.response) {
          switch (err.response.status) {
            case 409:
              setErrorMessage(
                t('authForm.fetchingErrors.usernameAlreadyExists')
              );
              notify(t('authForm.fetchingErrors.usernameAlreadyExists'));
              setAuthFailed(true);
              inputRef.current.select();
              break;
            case 401:
              setErrorMessage(
                t('authForm.fetchingErrors.usernameOrPasswordIncorrect')
              );
              notify(t('authForm.fetchingErrors.usernameOrPasswordIncorrect'));
              setAuthFailed(true);
              inputRef.current.select();
              break;
            case 500:
              setErrorMessage(t('authForm.fetchingErrors.networkError'));
              notify(t('authForm.fetchingErrors.networkError'));
              throw err;
            default:
              setErrorMessage(t('authForm.fetchingErrors.errorOccurred'));
              notify(t('authForm.fetchingErrors.errorOccurred'));
              break;
          }
        } else {
          setErrorMessage(t('authForm.fetchingErrors.unknownError'));
          notify(t('authForm.fetchingErrors.unknownError'));
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-4">
        <h1>{t('signupTitle')}</h1>
        <div className="col-sm-4" style={{ width: '400px' }}>
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group className="m-3">
                <Form.Label htmlFor="username">
                  {t('authForm.username')}
                </Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.username}
                  placeholder={t('authForm.usernamePlaceholder')}
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.username}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label htmlFor="password">
                  {t('authForm.password')}
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder={t('authForm.passwordPlaceholder')}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.password}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label htmlFor="confirmPassword">
                  {t('authForm.passwordConfirmation')}
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder={t('authForm.passwordConfirmationPlaceholder')}
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  isInvalid={authFailed}
                  required
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end m-3">
                <Button
                  onClick={() => {
                    navigate(routes.loginPagePath());
                  }}
                  type="button"
                  className="me-2"
                  variant="btn btn-outline-secondary"
                  style={{ width: '150px' }}
                >
                  {t('loginTitle')}
                </Button>
                <Button
                  type="submit"
                  className="ms-2"
                  variant="outline-primary"
                  style={{ width: '150px' }}
                >
                  {t('signupConfirm')}
                </Button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
      {toastContainer}
    </div>
  );
};
