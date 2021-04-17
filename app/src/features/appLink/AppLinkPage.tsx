import React from 'react';
import { Dashboard } from '../../components/Dashboard';
import { useAppLinkActions, useAppLinkState } from './AppLinkModule';

export function AppLinkPage() {
  const {} = useAppLinkActions();
  const {} = useAppLinkState();
  return <Dashboard>LINK TODO</Dashboard>;
}
