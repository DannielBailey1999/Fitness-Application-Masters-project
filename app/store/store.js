import { configureStore } from '@reduxjs/toolkit'
import runningReducer from './runningSlice';
export default configureStore({
  reducer: {
    running: runningReducer,
  },
});