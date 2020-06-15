import { useState } from 'react';
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
};
