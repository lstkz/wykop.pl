import Link from 'next/link';
import React from 'react';
import tw, { styled } from 'twin.macro';
import { Alert } from './Alert';

interface AuthPageProps {
  children: React.ReactNode;
  title: string;
  error: string;
  isRegister: boolean;
}

interface TabLinkProps {
  active: boolean;
}

const TabLink = styled.a((props: TabLinkProps) => [
  tw`uppercase text-lg text-center px-5 hover:no-underline font-bold`,
  props.active
    ? tw`text-gray-800 border-b-2 border-gray-800 `
    : tw`text-gray-400 `,
]);

export function AuthPage(props: AuthPageProps) {
  const { children, title, error, isRegister } = props;
  return (
    <div>
      <div css={tw`max-w-sm mx-auto mt-8`}>
        <div className="flex">
          <Link href="/register" passHref>
            <TabLink active={isRegister}>zarejestruj się</TabLink>
          </Link>
          <Link href="/login" passHref>
            <TabLink active={!isRegister}>zaloguj się</TabLink>
          </Link>
        </div>
        <div css={tw`bg-gray-100 py-7 px-6 border border-gray-300`}>
          <div css={tw`text-sm font-bold text-gray-600`}>{title}</div>
          <div css={tw`grid gap-4 mt-8`}>
            {error && <Alert>{error}</Alert>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
