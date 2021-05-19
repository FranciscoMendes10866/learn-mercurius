const { mutationField, stringArg, nonNull } = require("@nexus/schema");
const { boomify } = require("@hapi/boom");

const { Comments } = require("../db/mongo");
const { Comment } = require("./typeDefs/comment");
const AuthGuard = require("../guards/authorization");

const newComment = mutationField("newComment", {
  type: Comment,
  args: {
    message: nonNull(stringArg()),
    post_id: nonNull(stringArg()),
  },
  resolve: async (root, { message, post_id }, { request }) => {
    try {
      const cred = AuthGuard(request);
      return await Comments.insert({ message, post_id, user_id: cred });
    } catch (err) {
      throw boomify(err);
    }
  },
});

const patchComment = mutationField("patchComment", {
  type: Comment,
  args: {
    id: nonNull(stringArg()),
    message: nonNull(stringArg())
  },
  resolve: async (root, { id, message, post_id }, ctx) => {
    try {
      return await Comments.findOneAndUpdate({ _id: id }, { $set: { message } });
    } catch (err) {
      throw boomify(err);
    }
  },
});

const destroyComment = mutationField("destroyComment", {
  type: Comment,
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (root, { id }, ctx) => {
    try {
      return await Comments.findOneAndDelete({ _id: id });
    } catch (err) {
      throw boomify(err);
    }
  },
});

module.exports = [newComment, patchComment, destroyComment];
