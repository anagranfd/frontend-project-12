import { Link } from 'react-router-dom';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../hooks/routes.js';

export const MainPage = () => {
  const [data, setData] = useState(null);
  const { loginRoute, pageNotExistRoute } = routes;

  // const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      setData(
        <nav>
          <ul>
            <li>
              <Link to={loginRoute}>Login Page</Link>
            </li>
            <li>
              <Link to={pageNotExistRoute}>Page 404</Link>
            </li>
          </ul>
        </nav>
      );
    }
    // else {
    //   navigate(loginRoute);
    // }
  }, []);

  return <>{data}</>;
};
