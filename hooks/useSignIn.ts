import { useCallback, useState, ChangeEvent } from 'react';

const useSignIn = () => {
  const [signInItem, setSignInItem] = useState({
    password: '',
    email: '',
  });

  const handleSignInItemChange = useCallback(
    (name: string) =>
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSignInItem({ ...signInItem, [name]: value });
      },
    [signInItem]
  );

  const submitSignIn = useCallback(() => {
    const f = async () => {
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = JSON.stringify(signInItem);

      const res = await fetch('http://localhost:4000/sign_in', {
        method,
        headers,
        body,
      });

      switch (res.status) {
        case 200:
          const { accessToken, refreshToken } = await res.json();
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          alert('sign in successfully');
          break;
        case 401 || 422:
          alert('invalid sign in');
        default:
          alert('invalid sign in');
          break;
      }
    };

    f();
  }, [signInItem]);

  return { signInItem, handleSignInItemChange, submitSignIn };
};

export default useSignIn;
