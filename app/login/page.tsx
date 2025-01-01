'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '../../redux/slices/authSlice';
import { Stack, Typography } from '@mui/material';
import InputWithLabel from '@/shared/InputWithLabel';
import MainBtn from '@/shared/MainBtn';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoginValidation } from '@/hooks/useLoginValidation';
import { loginService } from '@/services/loginService';
import ErrorAlert from '@/shared/ErrorAlert';
import { setAuthToken } from '@/utils/storage';

const LoginPage = () => {
  const [data, setData] = useState<{ name: string; email: string; password: string; confirmPassword: string }>({ name: '', email: '', password: '', confirmPassword: '' });
  const { validateForm, validationError, isFormValid } = useLoginValidation(data);
  const [apiError, setApiError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setApiError('');
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const { token, user } = await loginService(data);
      setAuthToken(token);
      dispatch(login({ token, user }));
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch {
      setApiError('Invalid username or password.');
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
        Sign In
      </Typography>

      {(validationError || apiError) && <ErrorAlert error={validationError || apiError} />}

      <Stack spacing={2}>
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
          placeholder="Password"
          data={data}
          type="password"
          setData={setData}
        />
      </Stack>

      <Typography
        component="span"
        variant="body1"
        sx={{
          fontWeight: 500,
          fontSize: '16px',
          color: 'primary.light',
          marginTop: '8px',
          cursor: 'pointer',
        }}
      >
        Forgot Password?
      </Typography>

      <MainBtn
        sx={{ maxWidth: '343px', padding: '12px 0', margin: '16px auto' }}
        onClick={handleSignIn}
        disabled={isLoading || !isFormValid}
      >
        {!isLoading ? 'Sign In' : <CircularProgress sx={{ color: '#fff' }} size={24} />}
      </MainBtn>

      <Stack alignItems="center">
        <Typography component="span" variant="subtitle1" m="5px">
          Don&apos;t have an account yet?{' '}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              textAlign: 'center',
              color: 'primary.light',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/sign-up')}
            m="5px"
          >
            Sign Up
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
