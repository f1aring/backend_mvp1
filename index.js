const express = require('express');
const app = express();
const port = 3000;
const router = require('./router');
const {main} = require('./model/db.model');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(router);


(async function () {
    try {
      await main();
      console.log("Connected to DB!");
      app.listen(port, () => {
        console.log(`[server]: Server running at http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  })();
