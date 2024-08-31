const express = require('express');
const router = express.Router();
const Company = require('../models/Company.js');

// Crear una nueva compañía
router.post('/companies', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
