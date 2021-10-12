const axios = require("axios");
const db_pool = require("./db");

function update_values() {
  axios
    .get("https://api.wazirx.com/api/v2/tickers")
    .then((res) => {
      Object.keys(res.data)
        .slice(0, 10)
        .forEach((key) => {
          let ele = res.data[key];
          db_pool
            .query(
              "INSERT INTO tickers" +
                "(tname, last, buy, sell, volume, base_unit)" +
                "VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (base_unit)" +
                "DO UPDATE SET tname = Excluded.tname, last = Excluded.last, " +
                "buy = Excluded.buy, sell = Excluded.sell, volume = Excluded.volume",
              [ele.name, ele.last, ele.buy, ele.sell, ele.volume, ele.base_unit]
            )
            .catch((err) => {
              console.error(err);
            });
        });
      console.log("Updating values successful.");
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { update_values };
