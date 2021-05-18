const { makeSchema } = require('@nexus/schema')
const { join } = require('path')

const { TodoQuery, NewTodo, PatchTodo, DestroyTodo } = require('../graphql/todo')

const schema = makeSchema({
    types: [TodoQuery, NewTodo, PatchTodo, DestroyTodo],
    outputs: {
        typegen: join(__dirname, "generated", "typegen.dto.ts"),
        schema: join(__dirname, "generated", "schema.gql"),
    }
})

module.exports = { schema }
