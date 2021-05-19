const { mutationField, stringArg, queryField, list, nonNull } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')

const { Posts, Comments } = require('../db/mongo')
const Post = require('./typeDefs/post')
const AuthGuard = require('../guards/authorization')

const newPost = mutationField('newPost', {
    type: Post,
    args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg())
    },
    resolve: async (root, { title, content }, { request }) => {
        try {
            const cred = AuthGuard(request)
            return await Posts.insert({ title, content, user_id: cred })
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
            return await Posts.findOneAndUpdate({ _id: id }, { $set: { title, content } })
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
            const data = await Posts.findOneAndDelete({ _id: id })
            await Comments.remove({ post_id: id })
            return data
        } catch (err) {
            throw boomify(err)
        }
    }
})

module.exports = [newPost, findPosts, patchPost, destroyPost]
