const { mutationField, stringArg, nonNull } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')
const { hash, verify, argon2id } = require('argon2')
const { sign } = require('jsonwebtoken')

const { Users } = require('../db/mongo')
const { UserSignUp, UserSignIn } = require('./typeDefs/user')

const signUp = mutationField('signUp', {
    type: UserSignUp,
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        username: nonNull(stringArg())
    },
    resolve: async (root, { email, password, username }, ctx) => {
        try {
            const find = await Users.findOne({ email })
            if (find) {
                return null
            }
            const hashed = await hash(password, argon2id)
            return await Users.insert({ password: hashed, email, username })
        } catch (err) {
            throw boomify(err)
        }
    }
})

const signIn = mutationField('signIn', {
    type: UserSignIn,
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
    },
    resolve: async (root, { email, password }, ctx) => {
        try {
            const find = await Users.findOne({ email })
            if (!find) {
                return null
            }
            const val = await verify(find.password, password)
            if (!val) {
                return null
            }
            const token = sign({ id: find._id }, 'SECRET')
            return { _id: find._id, username: find.username, email: find.email, token }
        } catch (err) {
            throw boomify(err)
        }
    }
})

module.exports = [signUp, signIn]
