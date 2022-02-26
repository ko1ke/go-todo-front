import { useRef, useEffect } from 'react';
import { useSelector } from './../store';
import { errorSelector } from '../selectors/auth';
import toast from 'react-hot-toast';

const useErrorToast = () => {
  const mountRef = useRef(false);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (mountRef.current === true && error !== undefined) {
      toast.error(error.message || '予期しないエラーです');
    }
    mountRef.current = true;
  }, [error, mountRef]);
};

export default useErrorToast;
