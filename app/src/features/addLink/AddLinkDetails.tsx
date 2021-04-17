import React from 'react';
import { FormProvider } from 'react-hook-form';
import tw from 'twin.macro';
import { useUser } from '../../components/AuthModule';
import { Button } from '../../components/Button';
import { ContextInput } from '../../components/ContextInput';
import { useLinkForm } from './useLinkForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Url from 'url-parse';
import * as z from 'zod';
import { ContextField } from './ContextField';
import Link from 'next/link';
import { TagInput } from './TagInput';
import { gql } from '@apollo/client';
import { useCreateAppLinkMutation } from '../../generated';
import { Alert } from '../../components/Alert';
import { useRouter } from 'next/dist/client/router';

interface AddLinkDetailsProps {
  initialUrl: string;
}

const schema = z.object({
  url: z.string(),
  title: z.string().nonempty({ message: 'Pole wymagane' }),
  description: z.string().nonempty({ message: 'Pole wymagane' }),
  tags: z.array(z.string()).max(6, 'Maks 6 tagów'),
});

gql`
  mutation createAppLink($values: AppLinkInput!) {
    createAppLink(values: $values)
  }
`;

export type AddLinkFormValues = z.infer<typeof schema>;

export function AddLinkDetails(props: AddLinkDetailsProps) {
  const [error, setError] = React.useState('');
  const formMethods = useForm<AddLinkFormValues>({
    defaultValues: {
      url: props.initialUrl,
      description: '',
      title: '',
      tags: [],
    },
    resolver: zodResolver(schema),
  });

  const { formMethods: urlFormMethods } = useLinkForm(props.initialUrl);
  const user = useUser();
  const url = formMethods.watch('url');
  const domain = React.useMemo(() => {
    if (!url) {
      return '';
    }
    return new Url(url).hostname;
  }, [url]);
  const [createAppLink, { loading }] = useCreateAppLinkMutation();
  const router = useRouter();

  return (
    <div>
      <div css={tw`rounded shadow`}>
        <div css={tw`bg-blue-300 p-6`}>
          <FormProvider {...urlFormMethods}>
            <form
              onSubmit={urlFormMethods.handleSubmit(async values => {
                formMethods.setValue('url', values.url);
              })}
            >
              <ContextInput name="url" />
              <Button block css={tw`mt-2`} type="primary" htmlType="submit">
                Zmień
              </Button>
            </form>
          </FormProvider>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(async values => {
              setError('');
              try {
                const ret = await createAppLink({
                  variables: {
                    values,
                  },
                });
                void router.push('/link' + ret.data!.createAppLink);
              } catch (e) {
                setError(e.message);
              }
            })}
          >
            <div css={tw`flex px-12 py-6 bg-white`}>
              {error && <Alert>{error}</Alert>}
              <div>
                <div
                  css={tw`border-4 rounded-2xl py-2 text-center text-yellow-600 font-bold mb-2 border-blue-400`}
                >
                  0
                </div>
                <Button type="primary" size="small">
                  wykop
                </Button>
              </div>
              <div css={tw`px-6`}>
                <div css={tw`w-48 h-36 bg-gray-200`} />
                <Button block css={tw`mt-2`} type="primary">
                  Dodaj grafikę
                </Button>
              </div>
              <div css={tw`flex-1`}>
                <div css={tw``}>
                  <ContextField placeholder="Tytuł znaleziska" name="title" />
                </div>
                <div css={tw`mb-2`}>
                  <Link href={`/ludzie/${user.username}`} passHref>
                    <a css={tw`text-yellow-600 hover:( no-underline )`}>
                      @{user.username}
                    </a>
                  </Link>
                  <a
                    css={tw`hover:( no-underline border-gray-300 ) px-1 border border-transparent rounded inline-flex items-center leading-none`}
                    href={domain}
                    target="_blank"
                  >
                    {domain}
                  </a>
                </div>
                <ContextField
                  placeholder="TL;DR dla tych, którym nie chce się czytać"
                  name="description"
                  rows={4}
                />
                <TagInput />
              </div>
            </div>
            <div css={tw`flex px-2 py-4 bg-gray-200 justify-end`}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Dodaj znalezisko
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
