// implement changes to the schema(shape of data or structure)
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    // each table needs a primary key
    // we'll call it id, integer, auto-increments
    tbl.increments();

    tbl.text("name", 128).notNullable();

    tbl.unique();

    tbl.timestamps(true, true); //create_at and updated_at
  });
};

//undo the changes made in the up functiom
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
