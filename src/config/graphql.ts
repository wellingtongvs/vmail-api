import { ApolloDriver } from '@nestjs/apollo';

export const GraphQLConfig = {
  driver: ApolloDriver,
  autoSchemaFile: true,
  playground: true,
};
