const Fastify = require("fastify");
const mercurius = require("mercurius");

const { schema } = require("./schema")

const app = Fastify();

app.register(mercurius, { schema });

async function start(port) {
  try {
    await app.listen(port);
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
start(4000);
