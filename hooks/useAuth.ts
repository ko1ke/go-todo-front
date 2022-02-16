import { useEffect, useState, useRef } from 'react';
import type { User } from '../types/User';

export const useAuth = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
  });
  const authDoneRef = useRef(false);

  const postAuthUser = async (accessToken: string) => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    return await fetch('http://localhost:4000/auth_user', {
      method,
      headers,
    });
  };

  const postRefresh = async (refreshToken: string) => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ refreshToken: refreshToken });

    return await fetch('http://localhost:4000/refresh', {
      method,
      headers,
      body,
    });
  };

  useEffect(() => {
    const f = async () => {
      let accessToken = localStorage.getItem('accessToken');
      let refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        return;
      }

      let res = await postAuthUser(accessToken);
      if (res.status === 200) {
        const { id, username } = (await res.json()) as User;
        setUser({ id, username });
      } else {
        res = await postRefresh(refreshToken);
        if (res.status === 201) {
          let { accessToken, refreshToken } = await res.json();
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          res = await postAuthUser(accessToken as string);
          const { id, username } = (await res.json()) as User;
          setUser({ id, username });
        }
      }
      authDoneRef.current = true;
    };

    f();
  }, []);

  return { user, authDoneRef };
};
