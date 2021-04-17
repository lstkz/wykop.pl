import React from 'react';
import { useImmer } from 'context-api';
import { Dashboard } from '../../components/Dashboard';
import tw from 'twin.macro';
import { ArticleEditor } from './ArticleEditor';
import { IS_SSR } from '../../config';
import { Button } from '../../components/Button';

type State = {
  foo: boolean;
};

export function AddArticlePage() {
  const [state, setState, getState] = useImmer<State>(
    {
      foo: false,
    },
    'AddArticleModule'
  );

  return (
    <Dashboard>
      <div css={tw`bg-gray-100 h-full`}>
        <div css={tw`container`}>
          <div css={tw`border border-gray-200 bg-gray-50`}>
            <div css={tw`border-b border-gray-200 px-6`}>
              <div css={tw`text-xl font-bold`}>
                Stwórz treść, którą chcesz dodać do Wykop.pl
              </div>
              <div css={tw`my-6`}>
                Przed dodaniem znaleziska upewnij się, czy wprowadzony tekst
                jest poprawny. Jego treść{' '}
                <span css={tw`text-yellow-700`}>
                  możesz edytować tylko przez 15 minut
                </span>{' '}
                po jego opublikowaniu.
              </div>
            </div>
            <ArticleEditor />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
