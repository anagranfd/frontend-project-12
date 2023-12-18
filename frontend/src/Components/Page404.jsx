import { useTranslation } from 'react-i18next';

const BuildPage = (index) => {
  const { t } = useTranslation();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '90vh' }}
    >
      <div>
        <h3>
          {t('errorWord')}
          {index}
        </h3>
        <div>{t('title404')}</div>
      </div>
    </div>
  );
};

const Page404 = () => BuildPage(404);

export default Page404;
