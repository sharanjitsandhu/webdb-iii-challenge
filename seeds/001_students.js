exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Anonymous", cohort_id: 001 },
        { name: "Anonymous1", cohort_id: 002 },
        { name: "Anonymous2", cohort_id: 002 },
        { name: "Anonymous3", cohort_id: 003 },
        { name: "Anonymous4", cohort_id: 004 },
        { name: "Anonymous5", cohort_id: 005 },
        { name: "Anonymous6", cohort_id: 005 }
      ]);
    });
};
