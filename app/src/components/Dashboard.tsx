import React from 'react';
import tw from 'twin.macro';
import { Header } from './Header';

interface DashboardProps {
  children: React.ReactNode;
}

export function Dashboard(props: DashboardProps) {
  const { children } = props;
  return (
    <div css={tw`h-full flex flex-col`}>
      <Header />
      <div css={tw`flex-auto`}>{children}</div>
    </div>
  );
}
