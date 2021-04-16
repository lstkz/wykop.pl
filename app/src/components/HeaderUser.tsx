import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import tw from 'twin.macro';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useAuthActions } from './AuthModule';

export function HeaderUser() {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
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
  const { logout } = useAuthActions();

  return (
    <>
      <div
        role="button"
        aria-label="user menu"
        css={tw`h-full flex items-center px-2`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={setReferenceElement}
      >
        <span css={tw`text-white text-3xl p-1`}>
          <FontAwesomeIcon icon={faUser} />
        </span>
      </div>

      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div css={tw`bg-white shadow border border-gray-200`}>
            <div
              css={tw`px-4 py-3 text-blue-600 text-sm hover:( cursor-pointer text-blue-800)`}
              onClick={logout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span css={tw`ml-2`}>wyloguj</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
