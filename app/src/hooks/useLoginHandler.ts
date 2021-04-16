import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from 'react';
import { useLoginMutation } from '../generated';
import { useAuthActions } from '../components/AuthModule';
import { gql } from '@apollo/client';

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  usernameOrEmail: z.string().nonempty({ message: 'Pole wymagane' }),
  password: z.string().nonempty({ message: 'Pole wymagane' }),
});

gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...DefaultAuthResult
    }
  }
`;

export function useLoginHandler() {
  const [error, setError] = React.useState('');
  const formMethods = useForm<LoginFormValues>({
    defaultValues: {
      password: '',
      usernameOrEmail: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  const { handleSubmit } = formMethods;
  const [login, { loading }] = useLoginMutation();
  const { loginUser } = useAuthActions();

  const onSubmit = handleSubmit(async values => {
    setError('');
    try {
      const ret = await login({
        variables: values,
      });
      loginUser(ret.data!.login!);
    } catch (e) {
      setError(e.message);
    }
  });

  return {
    formMethods,
    onSubmit,
    loading,
    error,
  };
}
