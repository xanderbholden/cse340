// models/partsModel.js

const pool = require("../database");

/**
 * Get all parts for a given inventory item (car).
 * @param {number} inv_id — the id of the car listing
 * @returns {Promise<Array>} — array of part objects (or empty if none)
 */
async function getPartsByInvId(inv_id) {
  try {
    const sql = `
      SELECT *
      FROM public.inventory_parts
      WHERE inv_id = $1
      ORDER BY part_id;
    `;
    const result = await pool.query(sql, [inv_id]);
    return result.rows;
  } catch (error) {
    console.error("getPartsByInvId error: " + error);
    return [];
  }
}

/**
 * Add a new part / modification to a given car listing.
 * @param {number} inv_id — the id of the car listing
 * @param {string} part_name — name of the part/mod
 * @param {string} part_description — optional description of the part/mod
 * @param {string|null} part_photo — optional: path or URL for a part photo
 * @returns {Promise<Object>} — newly inserted part record
 */
async function addPart(inv_id, part_name, part_description, part_photo = null) {
  try {
    const sql = `
      INSERT INTO public.inventory_parts (inv_id, part_name, part_description, part_photo)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(sql, [inv_id, part_name, part_description, part_photo]);
    return result.rows[0];
  } catch (error) {
    console.error("addPart error: " + error);
    throw error;
  }
}

/**
 * (Optional) Delete a part by part_id
 * @param {number} part_id
 * @returns {Promise}
 */
async function deletePart(part_id) {
  try {
    const sql = `DELETE FROM public.inventory_parts WHERE part_id = $1;`;
    await pool.query(sql, [part_id]);
  } catch (error) {
    console.error("deletePart error: " + error);
    throw error;
  }
}

module.exports = {
  getPartsByInvId,
  addPart,
  deletePart,    // optional — include if you want deletion support
};
