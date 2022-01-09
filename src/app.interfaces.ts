export interface EnvironmentVariables {
  PORT: number;
  USERNAME_FIELD: string;
  PASSWORD_FIELD: string;
  COOKIE_PARSER_SECRET: string;
  COOKIE_IS_HTTPS: boolean;
  COOKIE_MAXAGE: number;
  CLIENT_IP: string;
  CLIENT_PORT: number;
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  MQTT_URL: string;
  MQTT_PORT: string;
  LOWBUS_ARRIVAL_API_URI: string;
  LOWBUS_ARRIVAL_ENCODING_KEY: string;
  LOWBUS_ARRIVAL_DECODING_KEY: string;
  BUS_ROUTE_API_URI: string;
  LOWBUS_ROUTE_API_URI: string;
  BUS_ROUTE_ENCODING_KEY: string;
  BUS_ROUTE_DECODING_KEY: string;
}
