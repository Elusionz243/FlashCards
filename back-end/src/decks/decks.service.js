const list = (knex) => knex("decks").select("*");

module.exports = {
  list,
};
