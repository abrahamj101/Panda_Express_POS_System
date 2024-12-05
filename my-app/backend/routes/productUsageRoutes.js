const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as needed

router.post('/product-usage', async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const query = `
      SELECT ii.inventoryItem_name, SUM(t.inventory_amount) AS total_used
      FROM orders o
      JOIN UNNEST(o.menuitem_ids) WITH ORDINALITY AS oi(menuitem_id, ord_m) ON TRUE
      JOIN menuitems mi ON mi.menuitem_id = oi.menuitem_id
      JOIN UNNEST(mi.fooditem_ids) WITH ORDINALITY AS fo(fooditem_id, ord_f) ON TRUE
      JOIN fooditems fi ON fi.fooditem_id = fo.fooditem_id
      JOIN UNNEST(fi.inventoryitem_ids, fi.inventory_amounts) WITH ORDINALITY AS t(inventoryItem_id, inventory_amount, ord_i) ON TRUE
      JOIN inventoryitems ii ON ii.inventoryitem_id = t.inventoryItem_id
      WHERE o.ordered_time BETWEEN ? AND ?
      GROUP BY ii.inventoryItem_name
      ORDER BY total_used DESC;
    `;
    const data = await db.query(query, [startDate, endDate]);
    res.json(data.rows);
  } catch (error) {
    console.error('Error fetching product usage data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
