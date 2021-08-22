import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Store } from '../Store'
import { v4 as uuidv4 } from 'uuid';

import WebSocketClient from "../utils/WebSocketClient";

import './Home.css'

const Home = () => {
  const [socket, setSocket] = useState(null)
  const { state, dispatch } = React.useContext(Store)

  const handleOnSelectCard = React.useCallback((card) => {
    return () => socket.selectCard(card, uuidv4())
  }, [socket])

  useEffect(() => {
    const newSocket = io(`http://0.0.0.0:3004/`)
    const webSocketClient = new WebSocketClient(io, newSocket, dispatch)
    setSocket(webSocketClient);
    return () => webSocketClient.close()
  }, [])

  console.log('state: ', state)

  return (
    <>
     <h1>
       Players {state.count}
     </h1>

     <h3>{state.game_time != null ? `${state.game_time}s to start the game` : ''}</h3>

      {!state.card_selected && state.cards_options.map((card, key) => (
        <div className='card' key={key} onClick={handleOnSelectCard(card)}>
          {card.map((values, key) => (
            <div className='card-row' key={key}>
              {values.map((value, key) => (
                <span className='card-value' key={key}>{value}</span>
              ))}
            </div>
          ))}
        </div>
      ))}

    {state.card_selected &&
      <>
          {state.card_selected.userId}
          <div className='card selected'>
            {state.card_selected.card.map((values, key) => (
                <div className='card-row' key={key}>
                  {values.map((value, key) => (
                    <span className={`
                        card-value
                        ${state.numbers.indexOf(value) != -1 ? 'active' : ''}
                    `} key={key}>{value}</span>
                  ))}
                </div>
            ))}
          </div>
      </>
    }
    </>
  );
};

export default Home;
