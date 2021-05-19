const { boomify } = require("@hapi/boom");
const { verify } = require("jsonwebtoken")

module.exports = AuthGuard = (request) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return null;
  }
  const token = authorization.replace("Bearer", "").trim();
  try {
    const { id } = verify(token, "SECRET");
    return id;
  } catch (err) {
    throw boomify(err);
  }
};
