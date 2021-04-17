import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const schema = z.object({
  url: z
    .string()
    .nonempty({ message: 'Pole wymagane' })
    .regex(URL_REGEX, 'Nieprawny adres URL'),
});

type FormValues = z.infer<typeof schema>;

export function useLinkForm(url = '') {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      url,
    },
    resolver: zodResolver(schema),
  });
  return { formMethods };
}
