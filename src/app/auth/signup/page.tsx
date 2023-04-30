'use client';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useSignUp } from '@app/auth/hooks';
import cn from 'classnames';
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
            className={cn('input input-bordered w-full', {
              'input-error': !!form.formState.errors?.firstName,
            })}
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
            className={cn('input input-bordered w-full', {
              'input-error': !!form.formState.errors?.lastName,
            })}
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
            className={cn('input input-bordered w-full', {
              'input-error': !!form.formState.errors?.email,
            })}
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
            {...form.register('password')}
            className={cn('input input-bordered w-full', {
              'input-error': !!form.formState.errors?.password,
            })}
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
          className={cn('btn btn-primary mt-4', {
            loading: form.formState.isSubmitting || signUp.isLoading,
          })}
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
