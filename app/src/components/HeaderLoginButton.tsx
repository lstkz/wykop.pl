import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { usePopper } from 'react-popper';
import tw from 'twin.macro';
import { useLoginHandler } from '../hooks/useLoginHandler';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Alert } from './Alert';
import { Button } from './Button';
import { ContextInput } from './ContextInput';
import { MenuItem } from './MenuItem';

export function HeaderLoginButton() {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLAnchorElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [],
  });
  const [isOpen, setIsOpen] = React.useState(false);

  useOutsideClick(() => {
    setIsOpen(false);
  }, [referenceElement, popperElement]);

  const { error, loading, onSubmit, formMethods } = useLoginHandler();

  return (
    <>
      <MenuItem
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={setReferenceElement}
      >
        Zaloguj się
      </MenuItem>

      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <form onSubmit={onSubmit}>
            <FormProvider {...formMethods}>
              <div
                css={tw`w-72 bg-white border border-gray-200 rounded shadow p-2 grid gap-2`}
              >
                {error && <Alert>{error}</Alert>}
                <ContextInput
                  label="LOGIN"
                  placeholder="login"
                  name="usernameOrEmail"
                />
                <ContextInput
                  label="HASŁO"
                  placeholder="hasło"
                  type="password"
                  name="password"
                />
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Zaloguj się
                </Button>
              </div>
            </FormProvider>
          </form>
        </div>
      )}
    </>
  );
}
