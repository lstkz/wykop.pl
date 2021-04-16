import React from 'react';
import { useImmer } from 'context-api';
import { Dashboard } from '../../components/Dashboard';
import { PickLinkType } from './PickLinkType';
import tw from 'twin.macro';

export type LinkType = 'add-link' | 'add-article';

type State = {
  type: 'choose' | LinkType;
};

export function AddLinkPage() {
  const [state, setState, getState] = useImmer<State>(
    {
      type: 'choose',
    },
    'addLinkModule'
  );
  return (
    <Dashboard>
      <div css={tw`bg-gray-100 h-full py-2`}>
        <div css={tw`container my-12`}>
          <h1 css={tw`text-3xl text-center mb-8`}>Chcesz dodać stronę WWW?</h1>
          <PickLinkType onType={type => {}} />
        </div>
      </div>
    </Dashboard>
  );
}
