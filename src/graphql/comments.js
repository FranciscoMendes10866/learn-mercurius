const { mutationField, stringArg, nonNull } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')

const { Comments } = require('../db/mongo')
const { Comment } = require('./typeDefs/comment')

const newComment = mutationField('newComment', {
    type: Comment,
    args: {
        message: nonNull(stringArg()),
        post_id: nonNull(stringArg()),
    },
    resolve: async (root, args, ctx) => {
        try {
            const data = await Comments.insert({ ...args })
            return data
        } catch (err) {
            throw boomify(err)
        }
    }
})

const patchComment = mutationField('patchComment', {
    type: Comment,
    args: {
        id: nonNull(stringArg()),
        message: nonNull(stringArg()),
        post_id: nonNull(stringArg()),
    },
    resolve: async (root, { id, message, user_id }, ctx) => {
        try {
            await Comments.update({ _id: id }, { $set: { message, user_id } })
            return await Comments.findOne({ _id: id })
        } catch (err) {
            throw boomify(err)
        }
    }
})

const destroyComment = mutationField('destroyComment', {
    type: Comment,
    args: {
        id: nonNull(stringArg()),
    },
    resolve: async (root, { id }, ctx) => {
        try {
            const data = await Comments.findOne({ _id: id })
            await Comments.remove({ _id: id })
            return data
        } catch (err) {
            throw boomify(err)
        }
    }
})

module.exports = [newComment, patchComment, destroyComment]
