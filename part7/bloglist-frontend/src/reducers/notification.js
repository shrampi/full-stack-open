import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      console.log('payload', action.payload);
      return action.payload;
    },
    removeNotification() {
      return '';
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;