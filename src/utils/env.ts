import { ConfigService } from 'nestjs-dotenv';

const configService = new ConfigService();

export const getOsEnv = (key: string, defaultValue?: string): string => {
  const envValue = configService.get(key);

  return envValue ? envValue : defaultValue || '';
};

export const getOsEnvBool = (key: string, defaultValue?: boolean): boolean => {
  const strVal = getOsEnv(key);

  return strVal ? strVal === 'true' : Boolean(defaultValue);
};
