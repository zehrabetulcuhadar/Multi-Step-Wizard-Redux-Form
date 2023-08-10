import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  completedSteps: [false, false, false, false], 
  formValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    district: '',
    address: '',
    apartmentNumber: '',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    acceptTerms: false,
  },
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
  },
});

export const { setStep, setFormValues, setCompletedSteps } = stepperSlice.actions;

export default stepperSlice.reducer;
