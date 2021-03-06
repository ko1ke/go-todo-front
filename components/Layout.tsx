import React from 'react';
import Link from 'next/link';
import { useSelector } from './../store';
import { userNameSelector, idSelector } from '../selectors/auth';
import useSignOut from '../hooks/useSignOut';
import useAuthByToken from '../hooks/useAuthByToken';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  useAuthByToken();
  const username = useSelector(userNameSelector);
  const id = useSelector(idSelector);
  const { submitSignOut } = useSignOut();

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
        <span> | </span>
        <button onClick={submitSignOut}>sign out</button>
      </div>
      <p>{username && id && `ID: ${id} |  Name: ${username}`}</p>
      <hr />
      {children}
    </>
  );
};

export default Layout;
