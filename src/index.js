import socket from "socket.io";
import WebSocketServer from "./utils/WebSocketServer";

let app = require('./server.js').default;
let http = require('http').createServer(app);

const io = socket(http, {
  cors: {
    origin: '*',
  }
});

io.on("connection", socket => {
    new WebSocketServer(io, socket)
});

if (module.hot) {
  module.hot.accept('./server.js', function() {
    console.log('🔁  HMR Reloading `./server.js`...');
    try {
      app = require('./server.js').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = 3004;

export default http.listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
});
