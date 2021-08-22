import {
  cards_options
} from '../Store/actions'

export default class WebSocketClient {
    constructor(io, socket, dispatch) {
        this.socket = socket;
        this.io = io;
        this.dispatch = dispatch;

        socket.on(cards_options, param => this.setCardsOptions(param));

        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
      }

      close () {
          this.socket.close()
      }

      setCardsOptions (param) {
        this.dispatch({
          type: cards_options,
          payload: param
        })
      }

      disconnect () {}
}
