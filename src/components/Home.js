import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Store } from '../Store'

import WebSocketClient from "../utils/WebSocketClient";

import './Home.css'

const Home = () => {
  const [socket, setSocket] = useState(null)
  const { state, dispatch } = React.useContext(Store)

  useEffect(() => {
    const newSocket = io(`http://0.0.0.0:3004/`)
    const webSocketClient = new WebSocketClient(io, newSocket, dispatch)
    setSocket(webSocketClient);
    return () => webSocketClient.close()
  }, [])

  return (
    <>
      {state.cards_options.map(card => (
        <div className='card'>
          {card.map(values => (
            <div className='card-row'>
              {values.map(value => (
                <span className='card-value'>{value}</span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Home;
