const { mutationField, stringArg, nonNull } = require('@nexus/schema')
const { boomify } = require('@hapi/boom')
const { hash, verify } = require('argon2')
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
            const hashed = await hash(password)
            const data = await Users.insert({ password: hashed, email, username })
            return data
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
            const data = await Users.findOne({ email })
            if (!data) {
                return null
            }
            const val = await verify(data.password, password)
            if (!val) {
                return null
            }
            const token = sign({ id: data._id }, 'SECRET')
            return { token }
        } catch (err) {
            throw boomify(err)
        }
    }
})

module.exports = [signUp, signIn]
