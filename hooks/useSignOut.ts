import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../slices/auth';

const useSignUp = () => {
  const dispatch = useDispatch();

  const submitSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return { submitSignOut };
};

export default useSignUp;
