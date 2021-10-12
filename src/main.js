// Server: Entry-Point (Main) Script
//
// Copyright (C) 2021 Goutham Krishna K V
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// -- ALL LIBRARY IMPORTS --
const express = require("express");
const cors = require("cors");
const db_pool = require("./db");
let { update_values } = require("./utilities");

// -- CONSTANTS --
const PORT = 5000;

// -- EXPRESS SERVER --
const app = express();

// -- SERVER MIDDLEWARES --
// - Enable CORS
app.use(cors());
// - Enable CORS
app.use(express.json());

// ROOT ROUTE (GET '/')
app.get("/", (_, res) => {
  db_pool
    .query("SELECT * FROM tickers")
    .then((vals) => {
      res.json(vals.rows);
    })
    .catch((err) => {
      console.error(err);
      res.json({ status: false, error: "select err" });
    });
});

// UPDATE ROUTE (GET '/update')
app.get("/update", (_, res) => {
  update_values();
  db_pool
    .query("SELECT * FROM tickers")
    .then((vals) => {
      res.json(vals.rows);
    })
    .catch((err) => {
      console.error(err);
      res.json({ status: false, error: "select err" });
    });
});

// LET APP LISTEN
app.listen(PORT, () => {
  console.log(`CONNECTED TO PORT ${PORT}`);
});
