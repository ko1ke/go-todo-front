import { useCallback, useState, ChangeEvent } from 'react';
import type { SignInItem } from '../types/Auth';
import { useDispatch } from 'react-redux';
import { signIn } from '../slices/auth';

const useSignIn = () => {
  const dispatch = useDispatch();

  const [signInItem, setSignInItem] = useState<SignInItem>({
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
    dispatch(signIn(signInItem));
  }, [signInItem, dispatch]);

  return { signInItem, handleSignInItemChange, submitSignIn };
};

export default useSignIn;
