// controllers/vehicleController.js

const vehicleCont = {};
const invModel = require("../models/inventory-model");
const { wrapVehicleHTML } = require("../utilities"); // import your HTML wrapper

/* ***************************
 *  Add a new vehicle
 * ************************** */
vehicleCont.addVehicle = async function (req, res, next) {
  try {
    const newVehicle = req.body;
    await invModel.addNewVehicle(newVehicle);
    res.redirect("/inv"); // redirect to inventory after adding
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Delete a vehicle
 * ************************** */
vehicleCont.deleteVehicle = async function (req, res, next) {
  try {
    const inv_id = req.params.invId;
    await invModel.deleteVehicleById(inv_id);
    res.redirect("/inv");
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Get vehicle details by inventory ID
 * ************************** */
vehicleCont.getVehicleDetails = async function (req, res, next) {
  try {
    const inv_id = req.params.invId;                       // get inventory id from route
    const vehicle = await invModel.getVehicleById(inv_id); // call model function
    if (!vehicle) {
      return res.status(404).send("Vehicle not found");
    }
    // Wrap vehicle info in HTML using your utility function
    const html = wrapVehicleHTML(vehicle);
    res.send(html); // or use res.render("vehicle-detail", { vehicle }) if using EJS
  } catch (error) {
    next(error);
  }
};

module.exports = vehicleCont;
