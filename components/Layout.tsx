import React from 'react';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
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
      {children}
    </div>
  );
};

export default Layout;
