import { createSlice } from '@reduxjs/toolkit';
import { includes } from 'lodash';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      console.log('Добавляемое сообщение:', message);
      state.entities[message.id] = message;
      if (!state.ids.includes(message.id)) {
        state.ids.push(message.id);
      }
      // state.ids.push(message.id);
    },
    removeMessages(state, action) {
      const { channelId } = action.payload;
      // console.log(state.entities[message.id]);
      const filteredEntries = Object.entries(state.entities).filter(
        ([msgId, message]) => message.channelId !== channelId
      );
      const filteredIds = filteredEntries.map(([msgId]) => msgId);
      state.entities = Object.fromEntries(filteredEntries);
      state.ids = [...filteredIds];
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addMessage, removeMessages } = messagesSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default messagesSlice.reducer;
