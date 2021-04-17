import React from 'react';
import tw from 'twin.macro';

interface FormErrorProps {
  children: React.ReactNode;
}

export function FormError(props: FormErrorProps) {
  const { children } = props;
  return <div css={tw`text-red-500 text-sm font-medium`}>{children}</div>;
}
