const monk = require('monk')

const db = monk('mongodb://root:root@localhost:27017/mercurius?authSource=admin')

const Posts = db.get('posts')
const Comments = db.get('comments')

module.exports = { Posts, Comments }
