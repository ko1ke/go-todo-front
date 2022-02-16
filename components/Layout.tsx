import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <div>
        <Link href="/">
          <a>top page</a>
        </Link>
        <span> | </span>
        <Link href="/sign_up">
          <a>sign up</a>
        </Link>
        <span> | </span>
        <Link href="/sign_in">
          <a>sign in</a>
        </Link>
      </div>
      <p>{user.id > 0 && `ID: ${user.id} |  Name: ${user.username}`}</p>
      <hr />
      {children}
    </>
  );
};

export default Layout;
