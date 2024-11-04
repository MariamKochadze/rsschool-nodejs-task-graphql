import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PostType } from './types/post.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: GraphQLString },
      },
      resolve: async (_, { title, content, authorId }, { prisma }) => {
        return prisma.post.create({
          data: {
            title,
            content,
            authorId,
          },
        });
      },
    },
  }),
});
