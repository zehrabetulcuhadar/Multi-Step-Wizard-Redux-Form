import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import './../CSS/StepOne.css';
import { useDispatch } from 'react-redux';
import { setStep, setFormValues, setCompletedSteps  } from './../stepperSlice';

const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Adana'];
const cityDistricts = {
  İstanbul: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar'],
  Ankara: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak'],
  İzmir: ['Konak', 'Buca', 'Karşıyaka', 'Bornova'],
  Bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Osmangazi'],
  Adana: ['Seyhan', 'Yüreğir', 'Çukurova', 'Sarıçam'],
};

const StepTwo = ({ formik }) => {
  const dispatch = useDispatch();
  const { values, validateForm, touched, errors, setTouched, setFieldValue } = useFormikContext();
  const [selectedCity, setSelectedCity] = useState(values.city);

  const handleNext = async () => {
    const formErrors = await validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(setStep(3));
      dispatch(setFormValues(values));
      dispatch(setCompletedSteps([true, true, false, false]));
    } else {
      const newTouched = Object.keys(values).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {});
      setTouched(newTouched);
    }
  };

  const handlePrev = () => {
    dispatch(setStep(1));
  };

  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    setFieldValue('city', cityValue); // formik alanını güncelle
    setFieldValue('district', ''); // İl değiştiğinde ilçeyi boşalt
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
          <label htmlFor="city">İl</label>
          <Field as="select" name="city" id="city" onChange={handleCityChange}>
            <option value="">Şehir Seçin</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Field>
          {touched.city && errors.city && (
            <div className="error-message">{errors.city}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="district">İlçe</label>
          <Field as="select" name="district" id="district" disabled={!selectedCity}>
            <option value="">İlçe Seçin</option>
            {selectedCity && cityDistricts[selectedCity].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Field>
          {touched.district && errors.district && (
            <div className="error-message">{errors.district}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address">Adres</label>
          <Field as="textarea" name="address" id="address" placeholder="Address" />
          {touched.address && errors.address && (
            <div className="error-message">{errors.address}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="apartmentNumber">Apartman Numarası</label>
          <Field type="text" name="apartmentNumber" id="apartmentNumber" placeholder="Apartment Number" />
          {touched.apartmentNumber && errors.apartmentNumber && (
            <div className="error-message">{errors.apartmentNumber}</div>
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

export default StepTwo;
