'use client';
import { formValidator } from '@/common/utils';
import { UserLogin } from '@/app/auth/dto';
import { useLogin } from '@/app/auth/hooks';
import { useForm } from 'react-hook-form';

export default function Login() {
  const form = useForm<UserLogin>({ resolver: formValidator(UserLogin) });
  const login = useLogin();
  const { errors } = form.formState;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        login.mutate(data);
      })}
    >
      <h2 className="text-4xl sm:text-6xl font-bold pb-8">Log In</h2>

      <p>
        <strong>Demo Account</strong>
        <br />
        email: chris@jobquest.com
        <br />
        password: Jobs#365
      </p>
      <div className="pt-4 flex flex-col gap-5">
        {login?.error?.messages && (
          <ul className="text-error list-disc list-inside">
            {login.error.messages.map((msg) => {
              return <li>{msg}</li>;
            })}
          </ul>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="form-email"
            data-testid="form-email"
            aria-invalid={!!emailError}
            className="input input-bordered w-full aria-invalid:input-error"
            {...form.register('email')}
          />
          {emailError && (
            <label className="label">
              <span className="label-text-alt text-error">{emailError}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="form-password"
            data-testid="form-password"
            aria-invalid={!!passwordError}
            {...form.register('password')}
            className="input input-bordered w-full aria-invalid:input-error"
          />
          {passwordError && (
            <label className="label">
              <span className="label-text-alt text-error">{passwordError}</span>
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={form.formState.isSubmitting || login.isLoading}
          className="btn btn-primary mt-4 disabled:loading"
        >
          Log In
        </button>

        <p>
          Don't have an account?
          <a href="/auth/signup" className="font-bold">
            {' '}
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}
