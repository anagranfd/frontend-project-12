import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 3 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Необходимо подтвердить пароль'),
});

export const Signup = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              setErrorMessage('the username with this name already exists');
              setAuthFailed(true);
              inputRef.current.select();
              break;
            case 401:
              setErrorMessage('the username or password is incorrect');
              setAuthFailed(true);
              inputRef.current.select();
              break;
            case 500:
              setErrorMessage('Network error');
              throw err;
            default:
              setErrorMessage('An error occurred');
              break;
          }
        } else {
          setErrorMessage('An unknown error occurred');
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-4">
        <h1>Signup</h1>
        <div className="col-sm-4" style={{ width: '400px' }}>
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group className="m-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.username}
                  placeholder="Username"
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
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Password"
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
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Confirm Password"
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
                  Back to login
                </Button>
                <Button
                  type="submit"
                  className="ms-2"
                  variant="outline-primary"
                  style={{ width: '150px' }}
                >
                  Submit
                </Button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};
