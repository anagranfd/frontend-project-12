import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import notify from './utils/notify.js';

const Login = () => {
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
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        console.log(JSON.stringify(res.data));
        navigate(routes.mainPagePath());
      } catch (err) {
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (err.isAxiosError && err.response) {
          switch (err.response.status) {
            case 401:
              setErrorMessage(
                t('authForm.fetchingErrors.usernameOrPasswordIncorrect'),
              );
              notify(
                t('authForm.fetchingErrors.usernameOrPasswordIncorrectToast'),
              );
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
        <h1 className="text-center">{t('loginTitle')}</h1>
        <div className="col-sm-4" style={{ width: '400px' }}>
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <FloatingLabel
                controlId="floatingInputUsername"
                label={t('authForm.nickname')}
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder={t('authForm.nicknamePlaceholder')}
                  name="username"
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
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputPassword"
                label={t('authForm.password')}
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder={t('authForm.passwordPlaceholder')}
                  name="password"
                  isInvalid={authFailed}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.password}
                  </div>
                ) : null}
                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              </FloatingLabel>

              <div className="mb-3">
                <Button
                  type="submit"
                  className="w-100 mb-2"
                  variant="outline-primary"
                >
                  {t('loginTitle')}
                </Button>
                <Button
                  onClick={() => navigate(routes.signupPagePath())}
                  type="button"
                  className="w-100"
                  variant="outline-secondary"
                >
                  {t('signupTitle')}
                </Button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
