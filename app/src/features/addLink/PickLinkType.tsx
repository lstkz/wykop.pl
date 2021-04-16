import { faKeyboard, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import tw from 'twin.macro';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { LinkType } from './AddLinkPage';
import { LinkTypeItem } from './LinkTypeItem';

interface PickLinkTypeProps {
  onType: (type: LinkType, url?: string) => void;
}

export function PickLinkType(props: PickLinkTypeProps) {
  const { onType } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div css={tw`bg-white shadow p-8 grid grid-cols-2 gap-4`}>
      <LinkTypeItem
        icon={faTv}
        text="W Twoje ręce wpadła ciekawa informacja? Dodaj link do swojego
            znaleziska i podziel się nim z innymi."
      >
        <Input
          ref={inputRef}
          css={tw`mb-2`}
          placeholder="wklej dodawany adres URL"
        />
        <Button
          type="primary"
          block
          onClick={() => {
            onType('add-link', inputRef.current?.value);
          }}
        >
          Dodaj znalezisko z sieci
        </Button>
      </LinkTypeItem>
      <LinkTypeItem
        icon={faKeyboard}
        text="Masz coś do powiedzenia? Poszukujesz pomocy? Stworzyłeś coś i chcesz
          się pochwalić?"
      >
        <Button type="primary" block disabled>
          Napisz artykuł na Wykop.pl
        </Button>
      </LinkTypeItem>
    </div>
  );
}
