import React from 'react';
import { useImmer } from 'context-api';
import { Dashboard } from '../../components/Dashboard';
import { PickLinkType } from './PickLinkType';
import tw from 'twin.macro';
import { AddLinkDetails } from './AddLinkDetails';

export type LinkType = 'add-link' | 'add-article';

type State = {
  type: 'choose' | LinkType;
  url?: string;
};

export function AddLinkPage() {
  const [state, setState] = useImmer<State>(
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
          {state.type === 'choose' && (
            <PickLinkType
              onType={(type, url) => {
                setState(draft => {
                  draft.type = type;
                  draft.url = url;
                });
              }}
            />
          )}
          {state.type === 'add-link' && (
            <AddLinkDetails initialUrl={state.url!} />
          )}
        </div>
      </div>
    </Dashboard>
  );
}
