import React from 'react';

function _checkParentNode(
  node: HTMLElement | null,
  target: HTMLElement | null
) {
  while (node) {
    if (node === target) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

export function useOutsideClick(
  fn: () => void,
  ignoreNodes: (HTMLElement | null)[]
) {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (ignoreNodes.some(node => _checkParentNode(target, node))) {
        return;
      }

      fn();
    };
    document.body.addEventListener('click', onClick);
    return () => {
      document.body.removeEventListener('click', onClick);
    };
  }, ignoreNodes);
}
