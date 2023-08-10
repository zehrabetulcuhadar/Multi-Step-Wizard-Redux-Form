import React, { useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { StepOne, StepTwo, StepThree, StepFour } from '../src/Stepper';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setStep, setFormValues, setCompletedSteps } from './Stepper/stepperSlice';

const App = () => {
  const formikRef = useRef(null);
  const currentStep = useSelector((state) => state.stepper.currentStep);
  const completedSteps = useSelector((state) => state.stepper.completedSteps);
  const formValues = useSelector((state) => state.stepper.formValues);
  const dispatch = useDispatch();
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formErrors = await formikRef.current.validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log(values);
      alert('Successfully submitted.');
      resetForm();
      dispatch(setStep(1));
      dispatch(setFormValues({}));
      dispatch(setCompletedSteps([false, false, false, false])); 
    } else {
      alert('Please fill in all required fields!');
    }
    setSubmitting(false);
  };
  

  const getCurrentStepValidationSchema = () => {
    if (currentStep === 1) {
      return Yup.object({
        firstName: Yup.string().required('Adınızı giriniz.'),
        lastName: Yup.string().required('Soyadınızı giriniz.'),
        email: Yup.string().email('Email formatına uyungun değil.').required('Email adresi zorunludur.'),
        password: Yup.string().required('Şifre zorunludur.').min(8, 'En az 8 karakter olmalıdır.'),
      });
    } else if (currentStep === 2) {
      return Yup.object({
        city: Yup.string().required('Şehir seçin.'),
        district: Yup.string().required('İlçe seçin.'),
        address: Yup.string().required('Detaylı adresinizi belirtin.'),
        apartmentNumber: Yup.string().required('Apartman numaranızı girin.'),
      });
    } else if (currentStep === 3) {
      return Yup.object({
        cardNumber: Yup.string()
          .required('Kart numarası zorunludur.')
          .matches(/^\d{16}$/, '16 basamaklı ve sadece rakam içermelidir.'),
        cardHolderName: Yup.string().required('Kart sahibinin adını giriniz.'),
        expiryDate: Yup.string()
          .required('Son kullanım tarihi zorunludur.')
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY formatında girin.'),
        cvv: Yup.string().required('CVV zorunludur.').matches(/^\d{3}$/, 'CVV 3 rakamdan oluşmalı.'),
      });
    } else {
      return Yup.object({
        acceptTerms: Yup.boolean().oneOf([true], 'Koşulları kabul etmelisiniz.'),
      });
    }
  };

  const steps = [
    <StepOne />,
    <StepTwo />,
    <StepThree />,
    <StepFour />,
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {steps.map((_, index) => (
          <div
            key={index}
            style={{
              width: '40px',
              height: '80px',
              background: completedSteps[index] ? '#6b78d8' : '#3c4a88',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: index + 1 === currentStep ? '#a4aaff' : 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 20px',
            }}
          >
            {completedSteps[index] ? '✔' : index + 1}
          </div>
        ))}
      </div>
      
      <Formik
        initialValues={formValues}
        validationSchema={getCurrentStepValidationSchema()}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {formik => (
          <Form>
            {currentStep === 1 && (
              <StepOne formik={formik} />
            )}
            {currentStep === 2 && (
              <StepTwo formik={formik} />
            )}
            {currentStep === 3 && (
              <StepThree formik={formik} />
            )}
            {currentStep === 4 && (
              <StepFour formik={formik} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App