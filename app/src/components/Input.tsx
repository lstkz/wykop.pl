import React from 'react';
import tw from 'twin.macro';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, ...rest } = props;
    return (
      <div>
        {label && (
          <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="text"
          css={[
            tw`border border-gray-300 rounded-md py-2 px-4 w-full text-gray-600 placeholder-gray-400`,
            tw`focus:( outline-none ring-2 ring-indigo-400 shadow-lg focus:ring-offset-2)`,
          ]}
          {...rest}
        />
      </div>
    );
  }
);
