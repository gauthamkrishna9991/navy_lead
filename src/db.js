const Pool = require("pg").Pool;

const db_pool = new Pool({
    user: "navy_lead_user",
    password: "navy_lead",
    host: "127.0.0.1",
    port: 5432,
    database: "navy_lead"
});

module.exports = db_pool;