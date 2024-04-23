const { default: axios } = require("axios");

const getLaureates = async (req, res) => {
  const { offset, gender, birthDate, deathDate, nobelPrizeCategory } =
    req.query;

  const filters = `&gender=${gender ?? ""}&birthDate=${
    birthDate ?? ""
  }&deathDate=${deathDate ?? ""}&nobelPrizeCategory=${
    nobelPrizeCategory ?? ""
  }`;

  const { data } = await axios.get(
    `http://api.nobelprize.org/2.0/laureates?offset=${offset}&limit=12${filters}`
  );

  res.json(data);
};

module.exports = {
  getLaureates,
};

const getLaureate = async (req, res) => {
  const laureateId = req.params.laureateId;

  const { data } = await axios.get(
    `http://api.nobelprize.org/2.0/laureate/${laureateId}`
  );

  res.json(data);
};

module.exports = {
  getLaureates,
  getLaureate,
};
