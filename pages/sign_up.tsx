import type { NextPage } from 'next';
import useSignUp from '../hooks/useSignUp';

const SignUp: NextPage = () => {
  const { signUpItem, handleSignUpItemChange, submitSignUp } = useSignUp();

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
      </div>
    </>
  );
};

export default SignUp;
