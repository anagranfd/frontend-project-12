import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div
      className="spinner-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">{t('spinner')}</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
