const { sseEmitter } = require('./sse')

const randomService = () => {
  setTimeout(() => {
    setInterval(() => {
      // Check if `sseEmitter.sendSSE` is null (will be undefined if no clients connected) and then send message
      if (sseEmitter.sendSSE) {
        sseEmitter.sendSSE({
          eventName: `Test name from server: ${Date.now()}`,
          data: `This data from server: ${new Date().toString()}`,
        });
      } else {
        console.log('No clients, not sending data', new Date().toString());
      }
    }, 1000); // run every second
  }, 5000); // wait 5 seconds to start
}

module.exports = randomService
