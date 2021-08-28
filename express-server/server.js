const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const app = express();
const port = 3000;

app.use(compression());

app.use(cors());

// enable example random service module sending sse data
const randomService = require('./randomService');
randomService();

app.use(helmet());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/sse', require('./sse').router);

app.listen(port, () => {
  console.log(`Example express app listening at http://localhost:${port}`);
});
