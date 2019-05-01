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

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The cohorts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const cohortId = req.params.id;
  db("cohorts")
    .where({ id: cohortId })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The cohort information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("cohorts")
        .where({ id })
        .first()
        .then(cohort => {
          res.status(200).json(cohort);
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the cohort to the database."
      });
    });
});

router.put("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record updated."}`
        });
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The cohort information could not be modified." });
    });
});

router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: {
            message: "The cohort with the specified ID does not exist."
          }
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The cohort information could not be removed." });
    });
});

module.exports = router;
