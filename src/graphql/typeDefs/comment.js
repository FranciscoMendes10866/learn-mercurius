const { objectType } = require('@nexus/schema')

const { Comments } = require('../../db/mongo')

const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.string('_id', { description: 'ID of the comment.'})
        t.string('message', { description: 'Message of the comment.'})
        t.string('post_id', { description: 'Post of the comment.'})
        t.string('user_id', { description: 'Post of the comment.'})
    }
})

const PostComments = objectType({
    name: 'PostComments',
    definition(t) {
        t.string('_id', { description: 'ID of the post.'})
        t.string('title', { description: 'Title of the post.'})
        t.string('content', { description: 'Content of the post.'})
        t.string('user_id', { description: 'Post of the comment.'})
        t.list.field('comments', {
            type: Comment,
            resolve: async ({ _id }, args, ctx) => {
                return await Comments.find({ post_id: _id.toString() })
            }
        })
    }
})

module.exports = { Comment, PostComments }
