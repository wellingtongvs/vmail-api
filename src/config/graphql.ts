import { ApolloDriver } from '@nestjs/apollo';

export const GraphQLConfig = {
  driver: ApolloDriver,
  autoSchemaFile: true,
  playground: true,
  introspection: true,
  installSubscriptionHandlers: true,
  subscriptions: {
    'graphql-ws': true,
    'subscriptions-transport-ws': true,
  },
};
