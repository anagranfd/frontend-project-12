import { createSlice } from '@reduxjs/toolkit';

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
    },
    removeMessages(state, action) {
      const { id } = action.payload.channel;
      // console.log(id);
      const filteredEntries = Object.entries(state.entities).filter(
        ([msgId, message]) => message.channelId !== id,
      );
      console.log(filteredEntries);
      const filteredIds = filteredEntries.map(([msgId]) => msgId);
      state.entities = Object.fromEntries(filteredEntries);
      state.ids = [...filteredIds];
    },
  },
});

export const { addMessage, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
