import { User } from '@app/dto';
import { formValidator } from '@src/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { apiService, authService } from '@src/services';

const resolver = formValidator(User);

export function useLoginForm() {
  const { register, handleSubmit, formState } = useForm<User>({ resolver });

  const url = 'http://localhost:3001/auth/login';
  // const login = (data: User) => axios.post(url, data);
  const login = (data: User) => authService.login(data.email, data.password);

  const mutation = useMutation<AxiosResponse, AxiosError, User, unknown>({
    mutationFn: login,
  });

  const onSubmitSuccess: SubmitHandler<User> = async (data: User, b) => {
    // await new Promise<void>((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000);
    // });

    mutation.mutate(data);
  };
  const onSubmit = handleSubmit(onSubmitSuccess);

  let errorMsg: string | undefined;
  if (mutation.isError) {
    const res = mutation.error.response;
    const status = res?.status;

    if (status === 401) {
      errorMsg = 'Invalid credentials, please try again';
    } else {
      errorMsg = 'server error, unable to login';
    }
  }

  return {
    form: { formState, onSubmit, register },
    server: {
      errorMsg,
    },
  };
}
