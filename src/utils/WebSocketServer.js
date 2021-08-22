import {
    cards_options,
    card_selected,
    players_count,
    game_time,
    bingo_callNumber,
    player_winner,
    players_winner
} from '../Store/actions'
import { crearCarton } from './crearCarton'
import { getOneFromMemory } from './getOneFromMemory'
import { checkWinners } from './winnervalidators'

const memory = {
  cartones: {},
  count: 0,
  winner: null,
  numbers: ['X'],
}

const MIN_TO_COUNTDOWN = 3;
const TIME_COUNTDOWN = 2 // s
let GAME_TIME_COUNTDOWN = TIME_COUNTDOWN // s

export default class WebSocketServer {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.emit(cards_options, [
            crearCarton(),
            crearCarton(),
            crearCarton()
        ]);

        this.playersCount()

        socket.on(card_selected, payload => this.selectCard(payload))
        socket.on(cards_options, payload => this.setCardsOptions(payload));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
      }


      winner (uuid) {
        this.io.emit(players_winner, `El jugador con id: ${uuid} ha ganado`)
      }

      ownerWinner () {
        this.socket.emit(player_winner, `El ganado!`)
      }

      selectCard (payload) {
        memory.cartones[payload.userId] = {
          ...payload,
          socketId: this.socket.id,
          socket: this.socket,
        }

        memory.count = memory.count + 1

        this.socket.emit(card_selected, {
          userId:  memory.cartones[payload.userId].userId,
          card:  memory.cartones[payload.userId].card
        })

        this.playersCount()
      }

      playersCount () {
        this.io.emit(players_count, memory.count)

        if (memory.count >= MIN_TO_COUNTDOWN) {
          this.gameTime(true)
        } else {
          this.gameTime(false)
        }
      }

      checkForWinner () {
        const numbers = memory.numbers
        const cartones = Object.keys(memory.cartones).map(key => {
          return {
            carton: memory.cartones[key].card,
            key,
            socket: memory.cartones[key].socket,
            socketId: memory.cartones[key].socketId
          }
        });

        cartones.forEach(({ carton, key }) => {
          const winner = checkWinners(carton, numbers)
          if (winner) {
            console.log('gano!')
            memory.winner = key
            this.winner(key)
          }
        })
      }


      gameTime (status) {
        if (status) {
          const refInterval = setInterval(() => {
            if (GAME_TIME_COUNTDOWN - 1 < 0) {
              GAME_TIME_COUNTDOWN = TIME_COUNTDOWN;
              this.io.emit(game_time, null);
              this.callNumber()
              return clearInterval(refInterval);
            }
            GAME_TIME_COUNTDOWN = GAME_TIME_COUNTDOWN -1;
            this.io.emit(game_time, GAME_TIME_COUNTDOWN);
          }, 1000)
        } else {
          // do not stop game if already started

          GAME_TIME_COUNTDOWN = TIME_COUNTDOWN;
          this.io.emit(game_time, null);
        }
      }

      callNumber () {
        if (memory.winner) return

        const nextNumner = getOneFromMemory(memory.cartones, memory.numbers)
        memory.numbers.push(nextNumner)
        this.checkForWinner()
        this.io.emit(bingo_callNumber, nextNumner)
        setTimeout(() => {
          this.callNumber()
        }, 2000)
      }

      connection () {
          console.log('connection! here')
      }

      disconnect () {
        const memoryKey = Object.keys(memory.cartones).find(key => memory.cartones[key].socketId === this.socket.id)
        if (memoryKey) {
          delete memory.cartones[memoryKey]
          memory.count = memory.count - 1
          this.playersCount()
        }
      }
}
