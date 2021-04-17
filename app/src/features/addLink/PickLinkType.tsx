import { faKeyboard, faTv } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import tw from 'twin.macro';
import { Button } from '../../components/Button';
import { LinkType } from './AddLinkPage';
import { LinkTypeItem } from './LinkTypeItem';
import { ContextInput } from '../../components/ContextInput';
import { useLinkForm } from './useLinkForm';
import Link from 'next/link';

interface PickLinkTypeProps {
  onType: (type: LinkType, url?: string) => void;
}

export function PickLinkType(props: PickLinkTypeProps) {
  const { onType } = props;
  const { formMethods } = useLinkForm();
  const { handleSubmit } = formMethods;

  return (
    <div css={tw`bg-white shadow p-8 grid grid-cols-2 gap-4`}>
      <LinkTypeItem
        icon={faTv}
        text="W Twoje ręce wpadła ciekawa informacja? Dodaj link do swojego
            znaleziska i podziel się nim z innymi."
      >
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(async values => {
              onType('add-link', values.url);
            })}
          >
            <ContextInput
              name="url"
              css={tw`mb-2`}
              placeholder="wklej dodawany adres URL"
            />
            <Button css={tw`mt-2`} type="primary" htmlType="submit" block>
              Dodaj znalezisko z sieci
            </Button>
          </form>
        </FormProvider>
      </LinkTypeItem>
      <LinkTypeItem
        icon={faKeyboard}
        text="Masz coś do powiedzenia? Poszukujesz pomocy? Stworzyłeś coś i chcesz
          się pochwalić?"
      >
        <Link href="/dodaj-artykul" passHref>
          <Button type="primary" block>
            Napisz artykuł na Wykop.pl
          </Button>
        </Link>
      </LinkTypeItem>
    </div>
  );
}
