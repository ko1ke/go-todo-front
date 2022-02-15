import { useCallback, useState, ChangeEvent } from 'react';

const useSignUp = () => {
  const [signUpItem, setSignupItem] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleSignUpItemChange = useCallback(
    (name: string) =>
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSignupItem({ ...signUpItem, [name]: value });
      },
    [signUpItem]
  );

  const submitSignUp = useCallback(() => {
    const f = async () => {
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = JSON.stringify(signUpItem);

      const res = await fetch('http://localhost:4000/sign_up', {
        method,
        headers,
        body,
      });
      console.log({ res });
      return res;
    };

    f();
  }, [signUpItem]);

  return { signUpItem, handleSignUpItemChange, submitSignUp };
};

export default useSignUp;
