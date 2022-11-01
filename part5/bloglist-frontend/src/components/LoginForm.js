const LoginForm = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={onSubmit}>
        <div>
          username <input type='text' value={username} onChange={onUsernameChange} />
        </div>
        <div>
          password <input type='password' value={password} onChange={onPasswordChange} />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  );
}

export default LoginForm;