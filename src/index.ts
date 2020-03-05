import {Loopback4ValidationApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Loopback4ValidationApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new Loopback4ValidationApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
