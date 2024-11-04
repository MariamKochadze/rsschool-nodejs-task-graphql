export type User = {
  id: string;
  name: string;
  balance: number;
};

export type CreateUser = {
  dto: Omit<User, 'id'>;
};

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import { UUIDType } from './uuid.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Represents a user in the system',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
