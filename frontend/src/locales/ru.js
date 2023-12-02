const ru = {
  translation: {
    loginTitle: 'Войти',
    signupTitle: 'Регистрация',
    signupConfirm: 'Подтвердить',
    authForm: {
      username: 'Имя пользователя',
      usernamePlaceholder: 'Введите имя пользователя...',
      password: 'Пароль',
      passwordPlaceholder: 'Введите пароль...',
      passwordConfirmation: 'Подтверждение пароля',
      passwordConfirmationPlaceholder: 'Подтвердите пароль...',
      fetchingErrors: {
        fetchingError: 'Ошибка при загрузке данных с сервера',
        newMessageDelivered: 'Сообщение успешно обработано сервером',
        newMessageDeliveryFailed:
          'Произошла ошибка при обработке сообщения сервером',
        newChannelDelivered: 'Канал успешно добавлен сервером',
        newChannelDeliveryFailed:
          'Произошла ошибка при добавлении канала сервером',
        channelRemovingDelivered: 'Канал успешно удален сервером',
        channelRemovingDeliveryFailed:
          'Произошла ошибка при удалении канала сервером',
        channelRenamingDelivered: 'Канал успешно перееименован сервером',
        channelRenamingDeliveryFailed:
          'Произошла ошибка при перееименовании канала сервером',
        channelAlreadyExists: 'Канал с таким именем уже существует',
        usernameAlreadyExists: 'Пользователь с таким именем уже существует',
        usernameOrPasswordIncorrect:
          'Имя пользователя либо пароль указаны неверно',
        networkError: 'Произошла ошибка при выполнении сетевого запроса',
        errorOccurred: 'Произошла ошибка',
        unknownError: 'Произошла неизвестная ошибка',
      },
      validationErrors: {
        usernameLettersMin: 'Минимум 3 буквы',
        usernameLettersMax: 'Максимум 20 букв',
        passwordLettersMin: 'Минимум 4 буквы',
        passwordLettersMax: 'Максимум 50 букв',
        confirmationFailed: 'Пароли должны совпадать',
        confirmationRequired: 'Необходимо подтвердить пароль',
        requiredField: 'Обязательное поле',
      },
    },
    modal: {
      addChannelTitle: 'Создать канал',
      addChannelSubmitButton: 'Создать',
      removeChannelTitle: 'Удалить канал',
      removeChannelSubmitButton: 'Удалить',
      renameChannelTitle: 'Переименовать канал',
      renameChannelSubmitButton: 'Подтвердить',
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
