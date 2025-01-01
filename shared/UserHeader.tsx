import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Avatar, Typography, Stack, Box } from '@mui/material';

const UserHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null; // No user logged in
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: '#0070f3',
            fontSize: '1.5rem',
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Stack>
          <Typography variant="h6" color="primary">
            {user.name || 'Unknown User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email || 'No Email Available'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserHeader;
