// controllers/partsController.js

const partsModel = require('../models/partsModel');
const inventoryModel = require('../models/inventoryModel');  // or whatever your inventory module is called

/**
 * Show a car detail page including parts/mods.
 * Route: GET /inventory/:inv_id
 */
async function showCarDetail(req, res, next) {
  try {
    const inv_id = req.params.inv_id;

    // Fetch the car info
    const car = await inventoryModel.getInventoryById(inv_id);
    if (!car) {
      return res.status(404).send("Car not found");
    }

    // Fetch associated parts/mods
    const parts = await partsModel.getPartsByInvId(inv_id);

    // Render view (adjust view name as per your setup)
    res.render('inventory/detail', { car, parts });
  } catch (error) {
    console.error("Error in showCarDetail:", error);
    next(error);  // pass to error handler
  }
}

/**
 * Handle adding a new part (aftermarket modification) to a car listing.
 * Route: POST /inventory/:inv_id/parts/add
 */
async function handleAddPart(req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const { part_name, part_description } = req.body;
    // If you support uploads (photos), handle them here too

    await partsModel.addPart(inv_id, part_name, part_description, null /* or photo path */);

    // After adding, redirect back to car detail
    res.redirect(`/inventory/${inv_id}`);
  } catch (error) {
    console.error("Error in handleAddPart:", error);
    next(error);
  }
}

module.exports = { showCarDetail, handleAddPart };
