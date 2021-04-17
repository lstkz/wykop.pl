import { ObjectID } from 'mongodb';
import * as z from 'zod';
import { AppLinkCollection, AppLinkModel } from '../collections/AppLink';
import { Resolvers } from '../types';
import slugify from 'slugify';

const schema = z.object({
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).max(6),
});

export const resolvers: Resolvers = {
  Mutation: {
    createAppLink: async (_, { values: _values }, context) => {
      const user = context.getUser();
      const values = schema.parse(_values);
      const linkModel: AppLinkModel = {
        ...values,
        slug: slugify(values.title),
        _id: new ObjectID(),
        authorId: user._id,
        type: 'link',
        totalVotes: 0,
      };
      await AppLinkCollection.insertOne(linkModel);
      return `/${linkModel._id.toHexString()}/${linkModel.slug}`;
    },
  },
  Query: {},
};
