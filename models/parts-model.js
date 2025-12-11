const pool = require("../database/")

const partsModel = {}

/* *******************************
 * Get all parts by vehicle id
 ******************************* */
partsModel.getPartsByInvId = async function (inv_id) {
  try {
    const sql = `
      SELECT part_id, inv_id, part_name, part_description, created_at
      FROM parts
      WHERE inv_id = $1
      ORDER BY created_at DESC;
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("getPartsByInvId error:", error)
    throw error
  }
}

/* *******************************
 * Add a part to a vehicle
 ******************************* */
partsModel.addPart = async function (inv_id, part_name, part_description) {
  try {
    const sql = `
      INSERT INTO parts (inv_id, part_name, part_description)
      VALUES ($1, $2, $3)
      RETURNING part_id, part_name;
    `
    const result = await pool.query(sql, [inv_id, part_name, part_description])
    return result.rows[0]
  } catch (error) {
    console.error("addPart error:", error)
    throw error
  }
}

module.exports = partsModel
