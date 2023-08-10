import React from 'react';
import { Field, useFormikContext } from 'formik';
import './../CSS/StepOne.css';
import { useDispatch } from 'react-redux';
import { setStep, setFormValues, setCompletedSteps } from './../stepperSlice';

const StepOne = ( formik ) => {
  const dispatch = useDispatch();
  const { values, validateForm, touched, errors, setTouched } = useFormikContext();


  const handleNext = async () => {
    const formErrors = await validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      dispatch(setStep(2));
      dispatch(setFormValues(values));
      dispatch(setCompletedSteps([true, false, false, false]));
    } else {
      const newTouched = Object.keys(values).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {});
      setTouched(newTouched);
    }
  };

  //{JSON.stringify(errors, 2, null)}
  //{JSON.stringify(touched, 2, null)}

  return (
    <div className="container">
    <div id="logo"> {/* Sol kısım */}
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
    </div>
    <div className="middle-section"> {/* Orta kısım */}
      <div className="form-group">
        <label htmlFor="firstName">Ad</label>
        <Field
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
        />
        {touched.firstName && errors.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Soyad</label>
        <Field
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
        />
        {touched.lastName && errors.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Şifre</label>
        <Field
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>
    </div>
    <div className="right-section"> {/* Sağ kısım */}
      <button type="button" className="next-button" onClick={handleNext}>
        İleri
      </button>
    </div>
  </div>
  );
};

export default StepOne