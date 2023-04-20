import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'database',
  database: 'vmail',
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
};
