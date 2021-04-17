import { ObjectID } from 'bson';
import { createCollection } from '../db';

type AppLinkType = 'link' | 'article';

export interface AppLinkModel {
  _id: ObjectID;
  authorId: ObjectID;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  url?: string;
  totalVotes: number;
  type: AppLinkType;
}

export const AppLinkCollection = createCollection<AppLinkModel>('appLink');
