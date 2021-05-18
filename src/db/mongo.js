const monk = require('monk')

const db = monk('mongodb://root:root@localhost:27017/?authSource=admin')

const todos = db.get('todos')

module.exports = { todos }
