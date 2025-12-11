const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Add a new part to a vehicle
router.post(
  "/add/:id",
  utilities.checkLogin,
  utilities.handleErrors(invController.addPart)
)

module.exports = router

