import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificaton',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return '';
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;