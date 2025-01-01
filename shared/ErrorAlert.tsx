// components/ErrorAlert.tsx
import { Alert } from '@mui/material';

const ErrorAlert = ({ error }: { error: string }) => {
  return error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null;
};

export default ErrorAlert;
