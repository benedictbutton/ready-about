import { useState } from 'react';
import { useSelector } from 'react-redux';

const useForm = callback => {
  const [values, setValues] = useState({});

  const { todos } = useSelector(state => state.todos);

  const handleValuesArray = key => {
    setValues(values => ({
      ...values,
      [key]: [],
    }));
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    callback(values);
  };

  const handleResetValues = () => setValues({});

  return {
    values,
    handleValuesArray,
    handleChange,
    handleSubmit,
    handleResetValues,
  };
};

export default useForm;
