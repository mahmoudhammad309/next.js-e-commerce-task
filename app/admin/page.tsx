"use client";

import useAdminRouteProtection from "@/hooks/useAdminRouteProtection";
import { getUsersForAdmin } from "@/services/getUsersForAdmin";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  TablePagination,
  Box,
} from "@mui/material";
import UserHeader from "@/shared/UserHeader";

const AdminPage = () => {
  useAdminRouteProtection();

  const [users, setUsers] = useState<
    { id: string; name: string; email: string; role: string; status: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = () => {
    setIsLoading(true);
    getUsersForAdmin()
      .then((users) => {
        setUsers(users);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch users. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleActiveStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Stack spacing={4} sx={{ p: 3 }}>
      <UserHeader />
      <Typography variant="h4" align="center">
        Admin Dashboard
      </Typography>

      <TextField
        label="Search Users"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading users...</Typography>
        </Stack>
      ) : error ? (
        <Stack alignItems="center" spacing={2}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" color="primary" onClick={fetchUsers}>
            Retry
          </Button>
        </Stack>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: user.status === "active" ? "green" : "red",
                          }}
                        />
                        <Typography variant="body2">{user.status}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color={user.status === "active" ? "warning" : "success"}
                          size="small"
                          onClick={() => handleToggleActiveStatus(user.id)}
                        >
                          {user.status === "active" ? "Deactivate" : "Reactivate"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </>
      )}
    </Stack>
  );
};

export default AdminPage;
