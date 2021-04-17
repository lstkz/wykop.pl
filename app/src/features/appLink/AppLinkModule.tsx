import React from 'react';
import { gql } from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { useImmer, createModuleContext, useActions } from 'context-api';
import { GetAppLinkDocument, GetAppLinkQuery } from '../../generated';
import { getApolloClient } from '../../getApolloClient';
import { AppLinkPage } from './AppLinkPage';
import { createGetServerSideProps } from '../../common/helper';

interface Actions {
  test: () => void;
}

interface State {
  foo: boolean;
}

const [Provider, useContext] = createModuleContext<State, Actions>();

export function AppLinkModule(props: appLinkSSRProps) {
  const {} = props;
  const [state, setState, getState] = useImmer<State>(
    {
      foo: false,
    },
    'appLinkModule'
  );
  const actions = useActions<Actions>({
    test: () => {},
  });

  return (
    <Provider state={state} actions={actions}>
      <AppLinkPage />
    </Provider>
  );
}

export function useAppLinkActions() {
  return useContext().actions;
}

export function useAppLinkState() {
  return useContext().state;
}

export type appLinkSSRProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

gql`
  query GetAppLink {
    allTodos {
      id
    }
  }
`;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetAppLinkQuery>({
    query: GetAppLinkDocument,
  });
  return {
    props: ret.data,
  };
});
