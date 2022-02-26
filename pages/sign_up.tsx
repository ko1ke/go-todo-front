import type { NextPage } from 'next';
import useSignUp from '../hooks/useSignUp';
import { useSelector } from './../store';
import { errorSelector } from '../selectors/auth';
import useErrorToast from '../hooks/useErrorToast';

const SignUp: NextPage = () => {
  const { signUpItem, handleSignUpItemChange, submitSignUp } = useSignUp();
  const error = useSelector(errorSelector);
  useErrorToast();
  
  return (
    <>
      <h1>Sign up</h1>
      <div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={signUpItem.username}
              onChange={handleSignUpItemChange('username')}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              value={signUpItem.email}
              onChange={handleSignUpItemChange('email')}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={signUpItem.password}
              onChange={handleSignUpItemChange('password')}
            />
          </label>
        </div>
        <button type="submit" onClick={submitSignUp}>
          Submit
        </button>
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default SignUp;
