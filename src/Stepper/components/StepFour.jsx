import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './../CSS/StepOne.css';
import { useDispatch } from 'react-redux';
import { setStep } from './../stepperSlice';

const StepFour = ({ formik }) => {
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setStep(3));
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
          <label className="custom-checkbox-label">
            <Field
              type="checkbox"
              name="acceptTerms"
              className="custom-checkbox"
              checked={formik.values.acceptTerms}
            />
            <span className="checkmark"></span>
            Şartları ve koşulları okudum. Kabul ediyorum.
          </label>
          <ErrorMessage name="acceptTerms" component="div" />
        </div>
      </div>
      <div className="right-section">
        <button
          type="button"
          className="next-button"
          onClick={() => formik.submitForm()}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default StepFour;



