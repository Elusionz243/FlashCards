/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE decks RESTART IDENTITY CASCADE");
  await knex("decks").insert([
    { deck_id: 1, name: "Deck-1", description: "Deck 1's description" },
  ]);
};
