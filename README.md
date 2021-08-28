# Server Sent Events (SSE) Example with Nuxt and Express

This is a example project showing how to get Server Sent Events [(`sse`)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) working with `nuxt` without any additional `sse` modules. For clarity, the express server is separated from the `nuxt` client.


## Usage

First use:

1. Start the server with `cd express-server && npm install && npm start`
2. Start the client with `cd nuxt-client && npm install && npm run dev`
3. Visit `http://localhost:4000/` in your browser

For server `sse` specific code check out [this file](https://github.com/jtlindsey/nuxt_server_sent_events_example/blob/main/express-server/sse.js).

For client `sse` specific code check out [this file](https://github.com/jtlindsey/nuxt_server_sent_events_example/blob/main/nuxt-client/components/SSEexample.vue)

See the `README.md` in the individual directory's for more details.
