import React from 'react';
import tw from 'twin.macro';
import { FormError } from '../../components/FormError';
import { useContextMethods } from '../../hooks/useContextMethods';

export function TagInput() {
  const name = 'tags';
  const [rawValue, setRawValue] = React.useState('');
  const { value, error, updateValue } = useContextMethods({
    name,
  });
  const tags = value as string[];
  return (
    <div>
      <div css={tw`bg-gray-100 p-2 rounded flex`}>
        <input
          css={[tw`px-1 mr-1 flex-1`, error && tw`text-red-500`]}
          type="text"
          placeholder="Wpisz #tagi, które kategoryzują znalezisko"
          onChange={e => {
            const str = e.target.value;
            setRawValue(str);
            const tags = str
              .split(' ')
              .map(x => x.trim())
              .filter(x => x);
            updateValue(tags);
          }}
          value={rawValue}
        />
        <span css={[error && tw`text-red-500`]}>{tags.length}/6</span>
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  );
}
