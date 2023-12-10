import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    // Свойство channels будет внутри объекта общего состояния: state.channels
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
