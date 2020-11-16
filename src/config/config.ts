import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getOsEnv, getOsEnvBool } from '../utils/env';

const typeormSSL = getOsEnvBool('TYPEORM_USE_SSL', true) && {
  rejectUnauthorized: false,
};

interface Config {
  typeorm: TypeOrmModuleOptions;
}

const config: Config = {
  typeorm: {
    type: 'postgres',
    url: getOsEnv('DATABASE_URL'),
    synchronize: getOsEnvBool('TYPEORM_SYNCHRONIZE', false),
    logging: getOsEnvBool('TYPEORM_LOGGING', false),
    ssl: typeormSSL,
    autoLoadEntities: true,
    retryAttempts: 0,
  },
};

export default config;
