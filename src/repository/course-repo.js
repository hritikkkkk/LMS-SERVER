const Course = require("../models/course");
const CrudRepository = require("./crud-repo");

class courseRepository extends CrudRepository {
  constructor() {
    super(Course);
  }
  async AdminCourse(userId) {
    return Course.find({ createdBy: userId });
  }
}

module.exports = courseRepository;
