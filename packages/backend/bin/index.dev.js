import http from 'http';

import dotenv from 'dotenv';
import sourceMapSupport from 'source-map-support';

dotenv.config();
sourceMapSupport.install();

async function go() {
  const appFactory = (await require('../src/index')).default;
  const app = await appFactory();
  const server = http.createServer(app);

  server.listen(process.env.PORT);

  await new Promise(function(res, rej) {
    server.once(`error`, rej);
    server.once(`listening`, res);
  });

  console.info(`server listening on ${process.env.PORT}`);

  if (module.hot) {
    let currentApp = app;

    module.hot.accept(`../src/index`, async function onAccept() {
      server.removeListener(`request`, currentApp);

      const nextAppFactory = (await require(`../src/index`)).default;

      currentApp = await nextAppFactory();

      server.on(`request`, currentApp);
      console.info(`server reloaded`);
    });
    module.hot.accept(function onError(err) {
      console.error(err);
    });
    module.hot.dispose(function onDispose() {
      server.close();
    });
  }
}

go().catch(function onError(err) {
  console.error(err);
  process.exit(1);
});
