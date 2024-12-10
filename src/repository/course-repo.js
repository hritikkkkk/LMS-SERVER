const Course = require("../models/course");
const CrudRepository = require("./crud-repo");

class courseRepository extends CrudRepository {
  constructor() {
    super(Course);
  }
}

module.exports = courseRepository;
