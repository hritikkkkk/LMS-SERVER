const CrudRepository = require("./crud-repo");
const User = require("../models/user");

class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async existingUser(userId) {
    return await User.findOne({ userId });
  }
}

module.exports = userRepository;
