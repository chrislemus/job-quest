import { TextField } from '@src/ui/atoms/text-field';

export function LoginForm() {
  return (
    <div>
      <p>Welcome back! Enter your account info below to continue.</p>
      <br />
      <TextField name="email" type="email" label="Email" />
      <TextField name="password" type="password" label="Password" />
    </div>
  );
}
