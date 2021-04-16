import Link from 'next/link';
import React from 'react';
import tw from 'twin.macro';
import { useAuthState } from './AuthModule';
import { HeaderLoginButton } from './HeaderLoginButton';
import { HeaderUser } from './HeaderUser';
import { MenuItem } from './MenuItem';

export function Header() {
  const { user } = useAuthState();
  return (
    <div css={tw`bg-blue-500 h-12 flex`}>
      <MenuItem active>wykop.pl</MenuItem>
      <MenuItem>Wykopalisko</MenuItem>
      <MenuItem>Mikroblog</MenuItem>
      <div css={tw`ml-auto flex`}>
        {user ? (
          <>
            <Link href="/dodaj" passHref>
              <MenuItem>Dodaj</MenuItem>
            </Link>
            <HeaderUser />
          </>
        ) : (
          <HeaderLoginButton />
        )}
      </div>
    </div>
  );
}
