import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'database',
  database: 'vmail',
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
};
