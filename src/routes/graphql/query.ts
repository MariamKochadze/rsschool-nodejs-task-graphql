import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, args, { prisma }) => {
        return prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id }, { prisma }) => {
        return prisma.post.findUnique({
          where: { id },
        });
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id }, { prisma }) => {
        return prisma.user.findUnique({
          where: { id },
        });
      },
    },
  }),
});
