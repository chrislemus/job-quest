'use client';
import { ModalCard } from '@common/ui/molecules';
import { Button } from '@common/ui/atoms/button';
import { PropsWithoutRef } from 'react';
import { TextField } from '@common/ui/atoms/text-field';
import { RouterAuthGuard } from '@core/auth/ui';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { User } from '@app/dto';
import { useLogin } from '@core/auth/mutation-hooks';

interface LoginModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function LoginModal(p: PropsWithoutRef<LoginModalProps>) {
  const form = useForm<User>({
    defaultValues: {
      email: 'me5@me.com',
      password: 'hello123',
    },
    resolver: formValidator(User),
  });

  const loginMutation = useLogin();

  let errorMsg: string | undefined;
  const errorStatus = loginMutation?.error?.response?.status;
  if (errorStatus) {
    if (errorStatus === 401) {
      errorMsg = 'Invalid credentials, please try again';
    } else {
      errorMsg = 'server error, unable to login';
    }
  }

  return (
    <RouterAuthGuard>
      <form
        onSubmit={form.handleSubmit(async (data: User) => {
          await loginMutation.mutate(data);
        })}
      >
        <ModalCard
          active={p.active}
          toggleActive={p.toggleActive}
          title="Log In"
          body={
            <>
              <p>Welcome back! Enter your account info below to continue.</p>
              {errorMsg && <p className="help is-danger">{errorMsg}</p>}
              <br />
              <TextField
                type="email"
                label="Email"
                isInvalid={form.formState.errors?.email?.message}
                {...form.register('email')}
              />

              <TextField
                type="password"
                label="Password"
                isInvalid={form.formState.errors?.password?.message}
                {...form.register('password')}
              />
            </>
          }
          footer={
            <>
              <Button
                color="primary"
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Log In
              </Button>
              <Button onClick={p.toggleActive} type="button">
                Cancel
              </Button>
            </>
          }
        />
      </form>
    </RouterAuthGuard>
  );
}
