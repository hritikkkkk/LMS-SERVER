const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: String,
  instructor: String,
  createdBy: { type: String, required: true },
});

/*               Middleware to handle cascading delete
   The issue arises because MongoDB (and by extension Mongoose) does    
    not automatically remove references in other collections when a document is deleted. 
    This is known as the lack of cascading deletes in MongoDB. 
*/

courseSchema.pre("findOneAndDelete", async function (next) {
  try {
    const courseId = this.getQuery()._id;
    const User = mongoose.model("User");

    await User.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Course", courseSchema);
