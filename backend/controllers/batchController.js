const db = require('../db');

async function addProductBatch(req, res) {
  const { product_type, quantity, origin_location, destination } = req.body;
  const exporter_id = req.user.userId; // comes from JWT middleware

  try {
    const result = await db.query(
      `INSERT INTO product_batches (exporter_id, product_type, quantity, origin_location, destination)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [exporter_id, product_type, quantity, origin_location, destination]
    );

    res.status(201).json({ message: 'Product batch submitted', batch: result.rows[0] });
  } catch (err) {
    console.error('Batch submission error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addProductBatch };
