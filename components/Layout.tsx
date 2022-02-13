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
      <Link href="/signup">
        <a>signup</a>
      </Link>
      <span> | </span>
      <Link href="/signin">
        <a>signin</a>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
