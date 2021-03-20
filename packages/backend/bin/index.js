import http from 'http';

import appFactory from '../src/index.js';

async function go() {
  const app = await appFactory();
  const server = http.createServer(app);

  await new Promise(function(res, rej) {
    server.once(`error`, rej);
    server.once(`listening`, res);
    server.listen(process.env.PORT);
  });

  console.info(`server listening on ${process.env.PORT}`);
}

go().catch(function onError(err) {
  console.error(err);
  process.exit(1);
});
