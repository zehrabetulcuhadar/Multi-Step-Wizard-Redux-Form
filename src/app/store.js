import { configureStore } from '@reduxjs/toolkit';
import stepperReducer from './../Stepper/stepperSlice';

const store = configureStore({
  reducer: {
    stepper: stepperReducer,
  },
});

export default store;