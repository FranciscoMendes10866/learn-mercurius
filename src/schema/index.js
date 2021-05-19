const { makeSchema } = require('@nexus/schema')
const { join } = require('path')

const Posts = require('../graphql/posts')
const Comments = require('../graphql/comments')
const Query = require('../graphql/query')
const Users = require('../graphql/users')

const schema = makeSchema({
    types: [Posts, Comments, Query, Users],
    outputs: {
        typegen: join(__dirname, "generated", "typegen.dto.ts"),
        schema: join(__dirname, "generated", "schema.gql"),
    }
})

module.exports = { schema }
