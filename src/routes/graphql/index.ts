import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { appGraphQLSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { loaders } from './loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const prisma = fastify.prisma;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const errors = validate(appGraphQLSchema, parse(query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }

      const response = await graphql({
        schema: appGraphQLSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, ...loaders(prisma) },
      });

      return response;
    },
  });
};

export default plugin;
