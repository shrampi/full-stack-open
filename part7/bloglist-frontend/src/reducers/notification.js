import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    }
  }
})

export const notify = (message) => {
  return (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;