/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    item: null,
  },
  reducers: {
    showModal: (state, action) => {
      const { type, item } = action.payload;
      state.isOpened = true;
      state.type = type;
      state.item = item ?? null;
    },
    hideModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.item = null;
    },
  },
});

export const { actionsModal } = modalSlice;
export default modalSlice.reducer;
