import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ContextInput } from '../../components/ContextInput';
import { Button } from '../../components/Button';
import { AuthPage } from '../../components/AuthPage';
import { useLoginHandler } from '../../hooks/useLoginHandler';

export function LoginPage() {
  const { error, loading, onSubmit, formMethods } = useLoginHandler();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <AuthPage error={error} title="MASZ JUŻ KONTO?" isRegister={false}>
          <ContextInput placeholder="login" name="usernameOrEmail" />
          <ContextInput placeholder="hasło" type="password" name="password" />
          <Button type="primary" block htmlType="submit" loading={loading}>
            ZALOGUJ SIĘ
          </Button>
        </AuthPage>
      </form>
    </FormProvider>
  );
}
