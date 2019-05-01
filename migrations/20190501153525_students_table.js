exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();

    tbl.text("name", 255).notNullable();

    // add a foreign key
    // cohort_id: references the id in the cohorts table.
    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id") // column
      .inTable("cohorts") // table
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {};
