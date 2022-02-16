import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

const Auth: React.FC<Props> = ({ children }) => {
  const { user, authDoneRef } = useAuth();
  const router = useRouter();
  const pathsNotRequireAuth = ['/'];
  const requireAuth = !pathsNotRequireAuth.includes(router.pathname);

  useEffect(() => {
    if (authDoneRef.current === false || requireAuth === false) {
      return;
    }
    if (user.id === 0) {
      router.push('/');
    }
  }, [authDoneRef]);

  if (requireAuth === false) {
    return <>{children}</>;
  }

  if (user.id === 0) {
    return <></>;
  }

  return <>{children}</>;
};

export default Auth;
