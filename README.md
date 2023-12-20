### Hexlet tests and linter status:

[![ESLint](https://github.com/anagranfd/frontend-project-12/actions/workflows/eslint.yml/badge.svg)](https://github.com/anagranfd/frontend-project-12/actions/workflows/eslint.yml)

[![Actions Status](https://github.com/anagranfd/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/anagranfd/frontend-project-12/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/7dbccb0e5518fabcf4e5/maintainability)](https://codeclimate.com/github/anagranfd/frontend-project-12/maintainability)

### Description:

This application is a simplified iteration of the Slack messaging platform, offering a suitable user experience.

### Technologies Used in the Project

- React
- React Bootstrap
- Redux Toolkit
- Axios
- Socket.io
- WebSocket
- Rollbar
- i18next
- Toastify
- LeoProfanity
- Formik

**How to Navigate the App:**

- **Login Page:** Begin by signing into the app using a registered account. If you're new, proceed to the Signup page to create a new user profile. Usernames should be between 3 to 20 characters, with a mandatory password of at least 6 characters, including a confirmation step. Upon successful registration, you'll be redirected to the Main Page.
- **Signup Page:** This page allows new users to register. It requires a username within the specified character limit and a confirmed password meeting the minimum length.

- **Main Page:** The heart of the chat application, this page displays a sidebar listing available channels and a messaging window for the selected channel. The first two channels are permanent fixtures, while others can be renamed or deleted through respective modal windows accessed via a dropdown menu adjacent to the channel's name. To add a new channel, simply click the 'Plus' button. The app features a profanity filter, replacing any offensive words with asterisks. Notifications confirm major actions within the app.

- **Navigation Bar:** Features a Logout button that signs out the current user and redirects to the Login page.

### Commands

- **install**:
  Executes `npm ci` to install dependencies in a clean-slate manner, using exact versions from `package-lock.json`.

  ```bash
  make install
  ```

- **start**:
  Combines the backend and frontend start commands to run both servers simultaneously, useful for full-stack development.

  ```bash
  make start
  ```
