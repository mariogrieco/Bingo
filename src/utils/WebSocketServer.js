import {
    cards_options
} from '../Store/actions'
import { crearCarton } from './crearCarton'

export default class WebSocketServer {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.emit(cards_options, [
            crearCarton(),
            crearCarton(),
            crearCarton()
        ]);

        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
      }

      close () {
          this.socket.close()
      }

      connection () {
          console.log('connection! here')
      }

      disconnect () {}
}
