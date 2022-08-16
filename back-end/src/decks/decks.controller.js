const service = require("./decks.service");

const list = async (req, res) => {
  const knex = req.app.get("db");
  return res.json({ data: await service.listDecks(knex) });
};

module.exports = {
  list,
};
