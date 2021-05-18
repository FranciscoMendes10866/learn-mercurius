const { mutationField, stringArg, queryField, list, nonNull } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')

const { Posts, Comments } = require('../db/mongo')
const Post = require('./typeDefs/post')

const newPost = mutationField('newPost', {
    type: Post,
    args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg())
    },
    resolve: async (root, args, ctx) => {
        try {
            const data = await Posts.insert({ ...args })
            return data
        } catch (err) {
            throw boomify(err)
        }
    }
})

const findPosts = queryField('findPosts', {
    type: list(Post),
    resolve: async (root, args, ctx) => {
        try {
            return await Posts.find()
        } catch (err) {
            throw boomify(err)
        }
    }
})

const patchPost = mutationField('patchPost', {
    type: Post,
    args: {
        id: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg())
    },
    resolve: async (root, { id, title, content }, ctx) => {
        try {
            await Posts.update({ _id: id }, { $set: { title, content } })
            return await Posts.findOne({ _id: id })
        } catch (err) {
            throw boomify(err)
        }
    }
})

const destroyPost = mutationField('destroyPost', {
    type: Post,
    args: {
        id: nonNull(stringArg())
    },
    resolve: async (root, { id }, ctx) => {
        try {
            const data = await Posts.findOne({ _id: id })
            await Posts.remove({ _id: id })
            await Comments.remove({ post_id: id })
            return data
        } catch (err) {
            throw boomify(err)
        }
    }
})

module.exports = [newPost, findPosts, patchPost, destroyPost]
