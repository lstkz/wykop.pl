import tw, { styled } from 'twin.macro';

interface MenuItemProps {
  active?: boolean;
}

export const MenuItem = styled.a<MenuItemProps>(props => [
  tw`h-full flex items-center px-3 text-white border-b-2 border-transparent font-medium`,
  tw`hover:( no-underline border-white cursor-pointer opacity-80 )`,
  props.active && tw`bg-blue-600`,
]);
