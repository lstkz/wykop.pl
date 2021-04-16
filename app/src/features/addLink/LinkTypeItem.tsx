import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import tw from 'twin.macro';

interface LinkTypeItemProps {
  icon: IconDefinition;
  text: string;
  children: React.ReactNode;
}

export function LinkTypeItem(props: LinkTypeItemProps) {
  const { children, text, icon } = props;
  return (
    <div css={tw``}>
      <div css={tw`text-center text-2xl mb-4`}>
        <FontAwesomeIcon icon={icon} className="fa-4x" />
      </div>
      <div css={tw`text-center mb-4`}>{text}</div>
      {children}
    </div>
  );
}
