import { useState } from "react";

export const useLoginValidation = (data: { email: string; password: string }) => {
    const [validationError, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
  
    const validateForm = (): boolean => {
      const { email, password } = data;
      if (!email || !password) {
        setError('Both email and password are required.');
        setIsFormValid(false);
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        setIsFormValid(false);
        return false;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setIsFormValid(false);
        return false;
      }
      setIsFormValid(true);
      setError('');
      return true;
    };
  
    return { validateForm, validationError, isFormValid };
  };