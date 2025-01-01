import * as Yup from 'yup';

export const useSignUpValidation = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const validateForm = async (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    try {
      await validationSchema.validate(data, { abortEarly: false }); // Validate all fields
      return { isValid: true, errors: {} }; // Return valid status and empty errors if no errors
    } catch (error) {
      const errors: { [key: string]: string } = {}; // Initialize an empty object for error messages
      if (error instanceof Yup.ValidationError && error.inner) {
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path) {
            errors[err.path] = err.message; // Assign the error message to the respective field
          }
        });
      }
      return { isValid: false, errors }; // Return false status and error messages
    }
  };

  return {
    validateForm,
  };
};
