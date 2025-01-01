"use client"; // Ensure this is on the hook file

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAdminRouteProtection = () => {
  const router = useRouter();
  const user = useSelector((state: { auth: { user: { role: string } | null } }) => state.auth.user);
  const isAdmin = user?.role === 'admin';
  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  return null; 
};

export default useAdminRouteProtection;
