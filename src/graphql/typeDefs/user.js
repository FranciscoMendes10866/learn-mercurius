const { objectType } = require('@nexus/schema')

const UserSignUp = objectType({
    name: 'UserSignUp',
    definition(t) {
        t.string('_id', { description: 'ID of the user.'})
        t.string('email', { description: 'Email of the user.'})
        t.string('password', { description: 'Password of the user.'})
        t.string('username', { description: 'Username of the user.'})
    }
})

const UserSignIn = objectType({
    name: 'UserSignIn',
    definition(t) {
        t.string('_id', { description: 'ID of the user.'})
        t.string('email', { description: 'Email of the user.'})
        t.string('username', { description: 'Username of the user.'})
        t.string('token', { description: 'Token of the user.'})
    }
})

module.exports = { UserSignUp, UserSignIn }
