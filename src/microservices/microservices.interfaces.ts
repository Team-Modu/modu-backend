import { DeviceEventCategory } from 'src/database/constants/device-event.constants';

export interface ICreateDeviceEventPayload {
  category: DeviceEventCategory;
  userDeviceId: string;
  drvierDeviceId: string;
  busStopId: string;
}
