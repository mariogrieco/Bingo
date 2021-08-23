import {
    cards_options,
    card_selected,
    players_count,
    game_time,
    bingo_callNumber,
    player_winner,
    players_winner,
    game_wait,
} from '../Store/actions'
import { crearCarton } from './crearCarton'
import { getOneFromMemory } from './getOneFromMemory'
import { checkWinners } from './winnervalidators'

const initialState = {
  cartones: {},
  count: 0,
  winner: null,
  numbers: ['X'],
  running: false,
}

let memory = {
  cartones: {},
  count: 0,
  winner: null,
  numbers: ['X'],
  running: false,
}

const MIN_TO_COUNTDOWN = 3;
const TIME_COUNTDOWN = 10 // s
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
        if (memory.running) return

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

        if (memory.count >= MIN_TO_COUNTDOWN) {
          this.gameTime(true)
          this.gameWait(true)
          memory.running = true
        }
      }

      gameWait (boolean) {
        this.io.emit(game_wait, boolean)
      }

      playersCount () {
        this.io.emit(players_count, memory.count)
      }

      checkForWinner () {
        let winner = false

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
          winner = checkWinners(carton, numbers)

          if (winner) {
            console.log('gano!')
            memory = { ...initialState, count: 0, running: false, winner: true }
            this.winner(key)
            this.gameTime(false)
            this.gameWait(false)
          }
        })

        return winner
      }

      gameTime (running) {
          if (!running) {
            this.io.emit(game_time, null);
          }

          const refInterval = setInterval(() => {
            if (memory.winner)  return clearInterval(refInterval);

            if (GAME_TIME_COUNTDOWN - 1 < 0) {
              GAME_TIME_COUNTDOWN = TIME_COUNTDOWN;
              this.callNumber()
              return clearInterval(refInterval);
            }

            GAME_TIME_COUNTDOWN = GAME_TIME_COUNTDOWN -1;
            this.io.emit(game_time, GAME_TIME_COUNTDOWN);
          }, 1000)
      }

      callNumber () {
        const nextNumner = getOneFromMemory(memory.cartones, memory.numbers)
        memory.numbers.push(nextNumner)
        this.io.emit(bingo_callNumber, nextNumner)

        if (this.checkForWinner()) return

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
