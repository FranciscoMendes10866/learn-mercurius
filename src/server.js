const Fastify = require("fastify");
const mercurius = require("mercurius");
const { boomify } = require("@hapi/boom");

const { schema } = require("./schema")

const app = Fastify();

app.register(mercurius, { schema });

async function start() {
  try {
    await app.listen(4000);
  } catch (err) {
    throw boomify(err);
  }
}
start();
