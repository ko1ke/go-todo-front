import type { NextPage } from 'next';
import useSignIn from '../hooks/useSignIn';

const SignIn: NextPage = () => {
  const { signInItem, handleSignInItemChange, submitSignIn } = useSignIn();

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
      </div>
    </>
  );
};

export default SignIn;
