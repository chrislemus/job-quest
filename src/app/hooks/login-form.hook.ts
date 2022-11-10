import { User } from '@app/dto';
import { formValidator } from '@src/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthCtx } from '@root/src/features/auth';

const resolver = formValidator(User);

export function useLoginForm() {
  const { register, handleSubmit, formState } = useForm<User>({ resolver });
  const authCtx = useAuthCtx();
  const login = (data: User) => authCtx.login(data.email, data.password);

  const mutation = useMutation<AxiosResponse, AxiosError, User, unknown>({
    mutationFn: login,
  });

  const onSubmitSuccess: SubmitHandler<User> = async (data: User, b) => {
    mutation.mutate(data);
  };
  const onSubmit = handleSubmit(onSubmitSuccess);

  let errorMsg: string | undefined;
  if (mutation.isError) {
    const res = mutation.error.response;
    const status = res?.status;

    if (status) {
      if (status === 401) {
        errorMsg = 'Invalid credentials, please try again';
      } else {
        errorMsg = 'server error, unable to login';
      }
    }
  }

  return {
    form: { formState, onSubmit, register },
    server: {
      errorMsg,
    },
  };
}
