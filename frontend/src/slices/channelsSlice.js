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
      // console.log(`setCurrentChannel ${channelId}`);
      // console.log(channelId);
      state.currentChannelId = channelId;
    },
    renameChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id].name = channel.name;
    },
    removeChannel(state, action) {
      const { channel } = action.payload;
      console.log(`onRemoveChannel: ${state.entities[channel.id]}`);
      // console.log(state.entities[channel.id]);
      delete state.entities[channel.id];
      state.ids = state.ids.filter((id) => id !== channel.id);
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
