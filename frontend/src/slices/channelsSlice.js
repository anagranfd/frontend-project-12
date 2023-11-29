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
    renameChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id].name = channel.name;
    },
    removeChannel(state, action) {
      const { channel } = action.payload;
      console.log(state.entities[channel.id]);
      delete state.entities[channel.id];
      state.ids = state.ids.filter((id) => id !== channel.id);
    },
  },
});

export const { addChannel, removeChannel, renameChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
