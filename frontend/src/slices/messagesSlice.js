import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
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
      state.ids.push(message.id);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addMessage } = messagesSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default messagesSlice.reducer;
