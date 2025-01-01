'use client';
import React, { useState } from "react";
import {
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSignUpValidation } from '@/hooks/useSignUpValidation';
import { signupService } from "@/services/signupService";
import ErrorAlert from "@/shared/ErrorAlert";
import InputWithLabel from "@/shared/InputWithLabel";
import MainBtn from "@/shared/MainBtn";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState<{ name: string; email: string; password: string; confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const { validateForm } = useSignUpValidation();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const { isValid, errors } = await validateForm(data);

    if (!isValid) {
      setApiError(Object.values(errors).join(', '));
      return;
    }

    setIsLoading(true);
    setApiError('');
    try {
      const res = await signupService(data);
      console.log("Signup successful:", res);
      router.push('/login');
    } catch {
      setApiError('Error during sign-up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Sign Up
      </Typography>

      {(apiError) && <ErrorAlert error={apiError} />}

      <Stack spacing={2}>
        <InputWithLabel
          name="name"
          label="Full Name"
          data={data}
          setData={setData}
          placeholder="Full Name"
        />
        <InputWithLabel
          name="email"
          label="Email"
          data={data}
          type="email"
          setData={setData}
          placeholder="Email"
        />
        <InputWithLabel
          name="password"
          label="Password"
          data={data}
          type="password"
          setData={setData}
          placeholder="Password"
        />
        <InputWithLabel
          name="confirmPassword"
          label="Confirm Password"
          data={data}
          type="password"
          setData={setData}
          placeholder="Confirm Password"
        />
      </Stack>

      <MainBtn
        sx={{ maxWidth: '343px', padding: '12px 0', margin: '16px auto' }}
        onClick={handleSignup}
        disabled={isLoading}
      >
        {!isLoading ? 'Sign Up' : <CircularProgress sx={{ color: '#fff' }} size={24} />}
      </MainBtn>

      <Stack alignItems="center">
        <Typography component="span" variant="subtitle1" m="5px">
          Already have an account?{' '}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: 'primary.light',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/login')}
            m="5px"
          >
            Sign In
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Signup;
