import { ApolloDriver } from '@nestjs/apollo';

export const graphQLConfig = {
  driver: ApolloDriver,
  context: ({ req }) => ({ req }),
  autoSchemaFile: true,
  playground: true,
  introspection: true,
  installSubscriptionHandlers: true,
  subscriptions: {
    'graphql-ws': true,
    'subscriptions-transport-ws': true,
  },
};
