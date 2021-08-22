import {
    cards_options,
    card_selected,
    players_count,
} from '../Store/actions'
import { crearCarton } from './crearCarton'

const memory = {
  count: 0
}

export default class WebSocketServer {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.emit(cards_options, [
            crearCarton(),
            crearCarton(),
            crearCarton()
        ]);

        socket.on(card_selected, payload => this.selectCard(payload))
        socket.on(cards_options, payload => this.setCardsOptions(payload));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
      }

      selectCard (payload) {
        memory[payload.uuid] = {
          ...payload,
          socketId: this.socket.id
        }

        memory.count = memory.count + 1

        this.socket.emit(card_selected, {
          uuid:  memory[payload.uuid].uuid,
          card:  memory[payload.uuid].card
        })

        this.playersCount()
      }

      playersCount () {
        this.io.emit(players_count, memory.count)
      }

      connection () {
          console.log('connection! here')
      }

      disconnect () {
        const memoryKey = Object.keys(memory).find(key => memory[key].socketId === this.socket.id)
        delete memory[memoryKey]
        memory.count = memory.count - 1
        this.playersCount()
      }
}
