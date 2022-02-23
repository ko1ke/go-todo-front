import type { NextPage } from 'next';
import useSignIn from '../hooks/useSignIn';
import { useSelector } from './../store';
import { errorSelector } from '../selectors/auth';

const SignIn: NextPage = () => {
  const { signInItem, handleSignInItemChange, submitSignIn } = useSignIn();
  const error = useSelector(errorSelector);

  return (
    <>
      <h1>Sign in</h1>
      <div>
        <div>
          <label>
            Email:
            <input
              type="text"
              value={signInItem.email}
              onChange={handleSignInItemChange('email')}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={signInItem.password}
              onChange={handleSignInItemChange('password')}
            />
          </label>
        </div>
        <button type="submit" onClick={submitSignIn}>
          Submit
        </button>
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default SignIn;
