const Fastify = require("fastify");
const mercurius = require("mercurius");

const { schema } = require("./schema")

const app = Fastify();

app.register(mercurius, {
  schema,
  graphiql: "playground",
  context: (request, reply) => ({ request, reply })
});

async function start(port) {
  try {
    await app.listen(port, () => {
      console.log("Playground running at http://localhost:4000/playground")
    });
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
start(4000);
