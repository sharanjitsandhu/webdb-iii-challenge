const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.db3"
  }
  // debug: true
};

const db = knex(knexConfig);

// [GET] /students This route will return an array of all students.
router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The students information could not be retrieved." });
    });
});

// [GET] /students/:id This route will return the student with the matching id.
/** router.get("/:id", (req, res) => {
  const studentId = req.params.id;
  db("students")
    .where({ id: studentId })
    .first()
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The student information could not be retrieved." });
    });
});
*/

/** Have the student returned by the [GET] /students/:id endpoint include the cohort name and remove the cohort_id fields. 
 The returned object should look like this:
{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
} */
router.get("/:id", (req, res) => {
  db("students")
    .join("cohorts", "cohorts.id", "students.cohort_id")
    .select({
      id: "students.id",
      name: "students.name",
      cohort: "cohorts.name"
    })
    .where({ "students.id": req.params.id })
    .first()
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The student information could not be retrieved." });
    });
});

// [POST] /students This route should save a new student to the database.
router.post("/", (req, res) => {
  db("students")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("students")
        .where({ id })
        .first()
        .then(student => {
          res.status(200).json(student);
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the student to the database."
      });
    });
});

// [PUT] /students/:id This route will update the student with the matching id using information sent in the body of the request.
router.put("/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record updated."}`
        });
      } else {
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The student information could not be modified." });
    });
});

// [DELETE] /students/:id This route should delete the specified student.
router.delete("/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: {
            message: "The student with the specified ID does not exist."
          }
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The student information could not be removed." });
    });
});

module.exports = router;
