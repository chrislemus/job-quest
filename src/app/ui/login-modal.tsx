'use client';
import { ModalCard } from '@src/ui/molecules';
import { Button } from '@src/ui/atoms/button';
import { PropsWithoutRef } from 'react';
import { TextField } from '@src/ui/atoms/text-field';
import { RouterAuthGuard } from '@src/features/auth/ui';
import { useForm } from 'react-hook-form';
import { formValidator } from '@root/src/utils';
import { User } from '@app/dto';
import { storeAsync } from '@src/storeAsync';

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

  const loginStore = storeAsync.auth.login();

  let errorMsg: string | undefined;
  const errorStatus = loginStore?.error?.response?.status;
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
          await loginStore.mutate(data);
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
