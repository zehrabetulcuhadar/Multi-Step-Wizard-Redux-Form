import React from 'react';
import { Field, useFormikContext } from 'formik';
import './../CSS/StepOne.css';
import { useDispatch } from 'react-redux';
import { setStep, setFormValues, setCompletedSteps } from './../stepperSlice';

const StepThree = ({ formik }) => {
  const dispatch = useDispatch();
  const { values, validateForm, touched, errors, setTouched } = useFormikContext();
  
  const handleNext = async () => {
    const formErrors = await validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(setStep(4));
      dispatch(setFormValues(values));
      dispatch(setCompletedSteps([true, true, true, false]));
    } else {
      const newTouched = Object.keys(values).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {});
      setTouched(newTouched);
    }
  };

  const handlePrev = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="container">
      <div className="left-section">
        <button type="button" className="next-button" onClick={handlePrev}>
          Geri
        </button>
      </div>
      <div className="middle-section">
        <div className="form-group">
          <label htmlFor="cardNumber">Kart Numarası</label>
          <Field type="text" name="cardNumber" id="cardNumber" placeholder="Card Number" />
          {touched.cardNumber && errors.cardNumber && (
            <div className="error-message">{errors.cardNumber}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cardHolderName">Kart Sahibinin Adı</label>
          <Field type="text" name="cardHolderName" id="cardHolderName" placeholder="Card Holder Name" />
          {touched.cardHolderName && errors.cardHolderName && (
            <div className="error-message">{errors.cardHolderName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Son Kullanma Tarihi <br />(MM/YY)</label>
          <Field type="text" name="expiryDate" id="expiryDate" placeholder="Expiry Date (MM/YY)" />
          {touched.expiryDate && errors.expiryDate && (
            <div className="error-message">{errors.expiryDate}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <Field type="text" name="cvv" id="cvv" placeholder="CVV" />
          {touched.cvv && errors.cvv && (
            <div className="error-message">{errors.cvv}</div>
          )}
        </div>
      </div>
      <div className="right-section">
        <button type="button" className="next-button" onClick={handleNext}>
          İleri
        </button>
      </div>
    </div>
  );
};

export default StepThree;
