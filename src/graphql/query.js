const { queryField, stringArg, nonNull } = require("@nexus/schema");
const { boomify } = require("@hapi/boom");

const { Posts } = require("../db/mongo");
const { PostComments } = require("./typeDefs/comment");

const singlePost = queryField("singlePost", {
  type: PostComments,
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (root, { id }, ctx) => {
    try {
      return await Posts.findOne({ _id: id });
    } catch (err) {
      throw boomify(err);
    }
  },
});

module.exports = [singlePost];
