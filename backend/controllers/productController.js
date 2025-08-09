const db = require('../db');

async function getProducts(req, res) {
  const { role, userId } = req.user;

  try {
    let query = '';
    let params = [];

    if (role === 'exporter') {
      // Show only their own batches
      query = `
        SELECT pb.*, u.full_name AS exporter_name
        FROM product_batches pb
        JOIN users u ON pb.exporter_id = u.id
        WHERE pb.exporter_id = $1
        ORDER BY pb.submission_date DESC
      `;
      params = [userId];

    } else if (role === 'qa_agency') {
      // Show all batches for inspection
      query = `
        SELECT pb.*, u.full_name AS exporter_name
        FROM product_batches pb
        JOIN users u ON pb.exporter_id = u.id
        ORDER BY pb.submission_date DESC
      `;

    } else if (role === 'importer') {
      // Show only certified batches (VC exists and not revoked)
      query = `
        SELECT pb.*, u.full_name AS exporter_name, vc.qr_code_url
        FROM product_batches pb
        JOIN users u ON pb.exporter_id = u.id
        JOIN verifiable_credentials vc ON vc.batch_id = pb.id
        WHERE vc.revoked = FALSE
        ORDER BY pb.submission_date DESC
      `;

    } else {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    const result = await db.query(query, params);
    res.json(result.rows);

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getProducts };
