import tw from 'twin.macro';
import { useContextMethods } from '../../hooks/useContextMethods';

interface ContextInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function ContextField(props: ContextInputProps) {
  const { name, ...rest } = props;
  const { value, error, hasError, updateValue, blur } = useContextMethods({
    name,
  });
  return (
    <div css={tw`w-full `}>
      <textarea
        {...rest}
        css={tw`w-full px-4 py-2 border border-gray-200 rounded`}
        name={name}
        value={value?.toString() ?? ''}
        onBlur={blur}
        onChange={e => {
          updateValue(e.target.value);
        }}
      />
      {hasError && (
        <div css={tw`text-red-500 text-sm font-medium`}>{error}</div>
      )}
    </div>
  );
}
