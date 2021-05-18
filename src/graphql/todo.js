const { objectType, extendType, stringArg, booleanArg, list } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')

const { todos } = require('../db/mongo')

const Todo = objectType({
    name: 'Todo',
    definition(t) {
        t.string('_id', { description: 'ID of the todo.'})
        t.string('description', { description: 'Description of the todo.'})
        t.boolean('isCompleted', { description: 'Completion of the todo.'})
    }
})

const TodoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('allTodos', {
            type: list(Todo),
            resolve: async (root, args, ctx) => {
                try {
                    return await todos.find()
                } catch (err) {
                    throw boomify(err)
                }
            },
        })
    }
})

const NewTodo = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('newTodo', {
            type: Todo,
            args: {
                description: stringArg('Description of the todo.'),
                isCompleted: booleanArg('Is the todo completed')
            },
            resolve: async (root, args, ctx) => {
                try {
                    return await todos.insert({ ...args })
                } catch (err) {
                    throw boomify(err)
                }
            }
        })
    }
})

const PatchTodo = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('patchTodo', {
            type: Todo,
            args: {
                id: stringArg('ID of the todo.'),
                description: stringArg('Description of the todo.'),
                isCompleted: booleanArg('Is the todo completed')
            },
            resolve: async (root, { id, description, isCompleted }, ctx) => {
                try {
                    await todos.update({ _id: id }, { $set: { description, isCompleted } })
                    return await todos.findOne({ _id: id })
                } catch (err) {
                    throw boomify(err)
                }
            }
        })
    }
})

const DestroyTodo = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('destroyTodo', {
            type: Todo,
            args: { id: stringArg('ID of the todo.') },
            resolve: async (root, { id }, ctx) => {
                try {
                    const data = await todos.findOne({ _id: id })
                    await todos.remove({ _id: id })
                    return data
                } catch (err) {
                    throw boomify(err)
                }
            }
        })
    }
})

module.exports = { TodoQuery, NewTodo, PatchTodo, DestroyTodo }
