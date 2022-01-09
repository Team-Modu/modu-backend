export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
  Provision = 'provision',
}

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

// export const EnvironmentVariables = {
//   NODE_ENV: Joi.string()
//     .valid('development', 'test', 'production', 'provision')
//     .required(),
//   PORT: Joi.number().required(),
//   COOKIE_IS_HTTPS: Joi.boolean().required(),
//   COOKIE_MAXAGE: Joi.number().required(),
//   SOM: Joi.string().required(),
//   EOM: Joi.string().required(),
//   USERNAME_FIELD_NAME: Joi.string().required(),
//   PASSWORD_FIELD_NAME: Joi.string().required(),
//   ACCESS_TOKEN: Joi.string().required(),
//   REFRESH_TOKEN: Joi.string().required(),
//   ACCESS_TOKEN_SECRET: Joi.string().required(),
//   REFRESH_TOKEN_SECRET: Joi.string().required(),
//   COOKIE_PARSER_SECRET: Joi.string().required(),
//   COOLSMS_API_KEY: Joi.string().required(),
//   COOLSMS_API_SECRET: Joi.string().required(),
//   COOLSMS_API_SALT_BYTE_LENGTH: Joi.number().required(),
//   COOLSMS_API_AUTHENTICATION_METHOD: Joi.string().required(),
//   COOLSMS_API_SEND_URL: Joi.string().required(),
//   COOLSMS_API_SENDER_PHONE: Joi.string().required(),
//   GITHUB_ACCESS_TOKEN: Joi.string().required(),
// };

export function matchEnvFile(rawEnvFile: string) {
  switch (Environment[rawEnvFile]) {
    case Environment.Test:
      return '.env.test';
    case Environment.Production:
      return '.env';
    case Environment.Provision:
      return '.env.provision';
    case Environment.Development:
    default: {
      return '.env.dev';
    }
  }
}
