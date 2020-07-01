/*import { useState } from 'react';
//for form input hook
export default (initialVal) => {
  const [value, setValue] = useState(initialVal);

  //handleChange method
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //reset method
  const reset = () => {
    setValue('');
  };
  return [value, handleChange, reset];
}; */

import { useState, useEffect } from 'react';
// validation
const useInputForm = (callback, validate) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  // prevent form from resubmitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // handleChange method
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  };
  // handleSubmit method
  const handleSubmit = (event) => {
    // stops default reloading behaviour
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  //reset method
  const reset = () => {
    setValues('');
  };
  // useEffect
  /***** Let’s add a useEffect Hook that listens to any changes to errors, checks the length of the object, and calls the callback function if the errors object is empty: ****/
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, callback, isSubmitting]);

  return {
    handleChange,
    handleSubmit,
    reset,
    values,
    errors,
  };
};

export default useInputForm;
