import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Roles } from 'src/auth/role.decorator';
import { ON_RESERVATION_CREATED } from '../constants/reservations/reservations-event.constants';
import { RESERVATION_CREATED } from '../constants/reservations/reservations-ws.constants';

@Roles('Any')
@WebSocketGateway(2743, {
  cors: { origin: true, credentials: true },
})
export class ReservationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected');
  }

  @OnEvent(ON_RESERVATION_CREATED)
  async onDateChanged() {
    this.server.emit(RESERVATION_CREATED, 'hi');
  }
}
