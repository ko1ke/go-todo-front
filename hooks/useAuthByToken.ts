import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser, refresh } from '../slices/auth';
import { useSelector } from './../store';
import { idSelector } from '../selectors/auth';

const useAuthByToken = () => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      return;
    }
    dispatch(authUser());
    dispatch(refresh());
  }, []);
};

export default useAuthByToken;
