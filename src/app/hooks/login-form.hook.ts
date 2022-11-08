import { User } from '@app/dto';
import { formValidator } from '@src/utils';
import { useForm } from 'react-hook-form';

const resolver = formValidator(User);

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver });

  const onSubmitSuccess = (data: User) => console.log(data);
  const onSubmit = handleSubmit(onSubmitSuccess);

  return { errors, onSubmit, register };
}
