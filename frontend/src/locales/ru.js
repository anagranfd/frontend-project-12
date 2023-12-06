const ru = {
  translation: {
    loginTitle: 'Войти',
    signupTitle: 'Регистрация',
    signupButton: 'Зарегистрироваться',
    signupConfirm: 'Подтвердить',
    authForm: {
      nickname: 'Ваш ник',
      nicknamePlaceholder: 'Ваш ник',
      username: 'Имя пользователя',
      usernamePlaceholder: 'Имя пользователя',
      password: 'Пароль',
      passwordPlaceholder: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      passwordConfirmationPlaceholder: 'Подтвердите пароль',
      fetchingErrors: {
        fetchingError: 'Ошибка при загрузке данных с сервера',
        newMessageDelivered: 'Сообщение успешно обработано сервером',
        newMessageDeliveryFailed:
          'Произошла ошибка при обработке сообщения сервером',
        newChannelDelivered: 'Канал создан',
        newChannelDeliveryFailed:
          'Произошла ошибка при добавлении канала сервером',
        channelRemovingDelivered: 'Канал удалён',
        channelRemovingDeliveryFailed:
          'Произошла ошибка при удалении канала сервером',
        channelRenamingDelivered: 'Канал переименован',
        channelRenamingDeliveryFailed:
          'Произошла ошибка при перееименовании канала сервером',
        channelAlreadyExists: 'Канал с таким именем уже существует',
        usernameAlreadyExists: 'Пользователь с таким именем уже существует',
        usernameOrPasswordIncorrect: 'Неверные имя пользователя или пароль',
        usernameOrPasswordIncorrectToast: 'Ошибка авторизации',
        networkError: 'Ошибка соединения',
        errorOccurred: 'Произошла ошибка',
        unknownError: 'Произошла неизвестная ошибка',
      },
      validationErrors: {
        usernameLettersMin: 'От 3 до 20 символов',
        usernameLettersMax: 'От 3 до 20 символов',
        passwordLettersMin: 'Минимум 4 буквы',
        passwordLettersMax: 'Максимум 50 букв',
        passwordLettersNotLess: 'Не менее 6 символов',
        confirmationFailed: 'Пароли должны совпадать',
        confirmationRequired: 'Необходимо подтвердить пароль',
        requiredField: 'Обязательное поле',
      },
    },
    modal: {
      addChannelTitle: 'Добавить канал',
      addChannelSubmitButton: 'Отправить',
      removeChannelTitle: 'Удалить канал',
      removeChannelSubmitButton: 'Удалить',
      renameChannelTitle: 'Переименовать канал',
      renameChannelSubmitButton: 'Отправить',
    },
    channelMenu: {
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
    },
    mainPage: {
      navTitle: 'Hexlet Chat',
      logoutButton: 'Выйти',
      channels: 'Каналы',
      messages: {
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
      newMessagePlaceholder: 'Введите сообщение...',
      newMessageButton: 'Отправить',
    },
    title404: 'Страница не найдена',
  },
};

export default ru;
