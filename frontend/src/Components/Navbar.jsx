import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes';

const Navbar = ({ logoutButtonRef, socket }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    socket.disconnect();
    navigate(routes.loginPagePath());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href={routes.mainPagePath()}>
          {t('mainPage.navTitle')}
        </a>
        {auth.loggedIn && (
          <div className="d-flex">
            <button
              onClick={() => {
                handleLogout();
              }}
              className="btn btn-primary"
              type="button"
              ref={logoutButtonRef}
            >
              {t('mainPage.logoutButton')}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
