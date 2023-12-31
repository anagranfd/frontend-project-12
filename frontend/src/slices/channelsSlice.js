/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: {},
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
    setCurrentChannel(state, action) {
      const { channelId } = action.payload;
      state.currentChannelId = channelId;
    },
    renameChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id].name = channel.name;
    },
    removeChannel(state, action) {
      const { channel } = action.payload;
      delete state.entities[channel.id];
      state.ids = state.ids.filter((id) => id !== channel.id);

      if (state.currentChannelId === channel.id) {
        [state.currentChannelId] = state.ids;
      }
    },
  },
});

export const actionsChannels = channelsSlice.actions;

export default channelsSlice.reducer;
