import React from 'react';
import { gql } from '@apollo/client';
import { useImmer } from 'context-api';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegisterMutation } from '../../generated';
import { ContextInput } from '../../components/ContextInput';
import { Button } from '../../components/Button';
import { useAuthActions } from '../../components/AuthModule';
import { AuthPage } from '../../components/AuthPage';

type State = {
  error: string;
};

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Pole wymagane' })
    .email('Niepoprawny adres email'),
  username: z
    .string()
    .nonempty({ message: 'Pole wymagane' })
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9_-]+$/,
      'Login musi mieć od 4 do 35 znaków, może zawierać małe i duże litery, cyfry, oraz znaki - i _ i zaczynać się od litery lub cyfry'
    )
    .min(4, 'Login musi mieć conajmniej 4 znaki'),
  password: z
    .string()
    .nonempty({ message: 'Pole wymagane' })
    .min(6, 'Hasło musi mieć conajmniej 6 znaków'),
});

gql`
  mutation Register($registerValues: RegisterInput!) {
    register(values: $registerValues) {
      ...DefaultAuthResult
    }
  }
  fragment DefaultAuthResult on AuthResult {
    token
    user {
      ...allUserProps
    }
  }
`;

export function RegisterPage() {
  const [state, setState] = useImmer<State>(
    {
      error: '',
    },
    'RegisterModule'
  );
  const { error } = state;
  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formMethods;
  const [register, { loading }] = useRegisterMutation();
  const { loginUser } = useAuthActions();
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(async values => {
          setState(draft => {
            draft.error = '';
          });
          try {
            const ret = await register({
              variables: {
                registerValues: values,
              },
            });
            loginUser(ret.data!.register!);
          } catch (e) {
            setState(draft => {
              draft.error = e.message;
            });
          }
        })}
      >
        <AuthPage error={error} title="ZAŁÓŻ KONTO NA WYKOP.PL" isRegister>
          <ContextInput placeholder="login" name="username" />
          <ContextInput placeholder="hasło" type="password" name="password" />
          <ContextInput placeholder="email" name="email" />
          <Button type="primary" block htmlType="submit" loading={loading}>
            ZAREJESTRUJ SIĘ
          </Button>
        </AuthPage>
      </form>
    </FormProvider>
  );
}
