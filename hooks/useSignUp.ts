import { useCallback, useState, ChangeEvent } from 'react';
import type { SignUpItem } from '../types/Auth';
import { useDispatch } from 'react-redux';
import { signUp } from '../slices/auth';

const useSignUp = () => {
  const dispatch = useDispatch();

  const [signUpItem, setSignupItem] = useState<SignUpItem>({
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
    dispatch(signUp(signUpItem));
  }, [signUpItem, dispatch]);

  return { signUpItem, handleSignUpItemChange, submitSignUp };
};

export default useSignUp;
