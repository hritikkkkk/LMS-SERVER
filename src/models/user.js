const mongoose = require("mongoose");
const { Enums } = require("../utils/common");
const { ServerConfig } = require("../config");
const jwt = require("jsonwebtoken");
const { ADMIN, USER } = Enums.USER_TYPE;

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, enum: [ADMIN, USER], default: USER },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

UserSchema.methods.genJWT = function generate() {
  return jwt.sign(
    { id: this._id, userId: this.userId },
    ServerConfig.JWT_SECRET,
    {
      expiresIn: ServerConfig.JWT_EXPIRY,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
