import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
    removeChannel(state, action) {
      // const { userId } = action.payload;
      // delete state.entities[userId];
      // state.ids = state.ids.filter((id) => id !== userId);
    },
  },
});

export const { addChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
