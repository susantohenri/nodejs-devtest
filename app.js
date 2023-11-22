const express = require('express');
const { query, validationResult } = require('express-validator');
const app = express();

app.use(express.json());
app.get('/health-check', [query('person').notEmpty(), query('email').isEmail()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

app.listen(3000);