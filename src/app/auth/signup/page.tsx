'use client';
import { formValidator } from '@common/utils';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@app/auth/hooks';
import { UserSignUp } from '@app/auth/dto';

export default function SignUp() {
  const form = useForm<UserSignUp>({
    resolver: formValidator(UserSignUp),
  });

  const signUp = useSignUp();
  const { errors } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        signUp.mutate(data);
      })}
    >
      <h2 className="text-4xl sm:text-6xl font-bold pb-3">Sign Up</h2>

      <div className="pt-4 flex flex-col gap-5">
        {signUp?.error?.messages && (
          <ul className="text-error list-disc list-inside">
            {signUp.error.messages.map((msg) => {
              return <li>{msg}</li>;
            })}
          </ul>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="form-first-name"
            data-testid="form-first-name"
            aria-invalid={!!errors.firstName}
            className="input input-bordered w-full aria-invalid:input-error"
            {...form.register('firstName')}
          />
          {errors.firstName?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.firstName.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="form-last-name"
            data-testid="form-last-name"
            aria-invalid={!!errors.lastName}
            className="input input-bordered w-full aria-invalid:input-error"
            {...form.register('lastName')}
          />
          {errors.lastName?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.lastName.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="form-email"
            data-testid="form-email"
            aria-invalid={!!errors.email}
            className="input input-bordered w-full aria-invalid:input-error"
            {...form.register('email')}
          />
          {errors.email?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
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
            aria-invalid={!!errors.password}
            {...form.register('password')}
            className="input input-bordered w-full aria-invalid:input-error"
          />
          {errors.password?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={form.formState.isSubmitting || signUp.isLoading}
          className="btn btn-primary mt-4 disabled:loading"
        >
          Sign Up
        </button>

        <p>
          Already have an account?
          <a href="/auth/login" className="font-bold">
            {' '}
            Log in
          </a>
        </p>
      </div>
    </form>
  );
}
