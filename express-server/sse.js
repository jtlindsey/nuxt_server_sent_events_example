const express = require('express')
const router = express.Router();

const sseEmitter = {};
const clients = [];

router.get('/', async (req, res) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });

  const clientID = Date.now();
  clients.push({
    clientID,
    res,
  });
  console.log('New Client. Total clients', clients.length);

  // create function that can be imported and
  // for sending event call sseEmitter.sendSSE(data)
  sseEmitter.sendSSE = (data = {}) => {
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      // need this line if using compression with express
      client.res.flush();
    });
  };

  // If client closes connection, stop sending events
  res.on('close', () => {
    const clientIndex = clients.findIndex((client) => client.clientID === clientID);
    clients[clientIndex].res.end();
    clients.splice(clientIndex, 1);
    console.log('Lost Client. Remaining clients =', clients.length);
  });
});

module.exports = {
  router,
  sseEmitter,
};