export default (err, setErrorMessage, notify, setAuthFailed, inputRef, t) => {
  if (err.isAxiosError && err.response) {
    switch (err.response.status) {
      case 409:
        setErrorMessage(t('authForm.fetchingErrors.usernameAlreadyExists'));
        notify(t('authForm.fetchingErrors.usernameAlreadyExists'));
        setAuthFailed(true);
        inputRef.current.select();
        break;
      case 401:
        setErrorMessage(
          t('authForm.fetchingErrors.usernameOrPasswordIncorrect'),
        );
        notify(t('authForm.fetchingErrors.usernameOrPasswordIncorrectToast'));
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
};
