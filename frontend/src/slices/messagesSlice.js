/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actionsChannels } from './channelsSlice';

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
    extraReducers: (builder) => {
      builder.addCase(actionsChannels.removeChannel, (state, action) => {
        const { channelId } = action.payload;
        state.ids = state.ids.filter(
          (id) => state.entities[id].channelId !== channelId,
        );
        state.entities = Object.fromEntries(
          Object.entries(state.entities).filter(
            ([, message]) => message.channelId !== channelId,
          ),
        );
      });
    },
  },
});

export const actionsMessages = messagesSlice.actions;

export default messagesSlice.reducer;
