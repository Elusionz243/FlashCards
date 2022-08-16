/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE cards RESTART IDENTITY CASCADE");
  await knex("cards").insert([
    {
      card_id: 1,
      front: "Differentiate between Real DOM and Virtual DOM.",
      back: "Virtual DOM updates are faster but do not directly update the HTML",
      deck_id: 1,
    },
    ,
  ]);
};
