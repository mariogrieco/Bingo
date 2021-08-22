import {
  cards_options,
  card_selected,
  players_count,
  game_time,
  bingo_callNumber,
} from '../Store/actions'

export default class WebSocketClient {
    constructor(io, socket, dispatch) {
        this.socket = socket;
        this.io = io;
        this.dispatch = dispatch;

        socket.on(bingo_callNumber, nextNum => this.callNumber(nextNum));
        socket.on(game_time, countdown => this.gameTime(countdown));
        socket.on(players_count, count => this.playersCount(count));
        socket.on(cards_options, param => this.setCardsOptions(param));
        socket.on(card_selected, payload => this.cardSelected({
          card: payload.card,
          uuid: payload.uuid,
        }));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
      }

      close () {
          this.socket.close()
      }

      playersCount (count) {
        this.dispatch({
          type: players_count,
          payload: count
        })
      }

      cardSelected (param) {
        this.dispatch({
          type: card_selected,
          payload: param
        })
      }

      setCardsOptions (param) {
        this.dispatch({
          type: cards_options,
          payload: param
        })
      }

      gameTime (countdown) {
        this.dispatch({
          type: game_time,
          payload: countdown
        });
      }

      callNumber (nextNum) {
        this.dispatch({
          type: bingo_callNumber,
          payload: nextNum,
        });
      }

      selectCard (card, uuid) {
        this.socket.emit(card_selected, {
          card,
          uuid
        })
      }

      disconnect () {}
}
