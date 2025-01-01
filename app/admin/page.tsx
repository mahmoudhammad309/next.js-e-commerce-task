"use client";
import useAdminRouteProtection from "@/hooks/useAdminRouteProtection";
import { getUsersForAdmin } from "@/services/getUsersForAdmin";
import { useEffect, useState } from "react";

const AdminPage = () => {
  useAdminRouteProtection();
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUsersForAdmin()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div>
      <h1>admin page</h1>
     {users.map((user) => (<li key={user.id}>{user.name}</li>))}
    </div>
  );
};

export default AdminPage;
