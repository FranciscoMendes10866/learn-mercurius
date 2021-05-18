const { objectType } = require('@nexus/schema')

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.string('_id', { description: 'ID of the post.'})
        t.string('title', { description: 'Title of the post.'})
        t.string('content', { description: 'Content of the post.'})
    }
})

module.exports = Post
