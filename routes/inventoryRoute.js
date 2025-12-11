// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invChecks = require("../utilities/inventory-validation")

/* ****************************************
 * Build vehicles by classification
 **************************************** */
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

/* ****************************************
 * Build vehicle detail view
 **************************************** */
router.get(
  "/detail/:id",
  utilities.handleErrors(invController.buildDetail)
)

/* ****************************************
 * Add a new part to a vehicle
 **************************************** */
router.post(
  "/detail/:id/parts/add",
  utilities.checkLogin,
  utilities.handleErrors(invController.addPart)
)

/* ****************************************
 * Error Route (Intentional error)
 **************************************** */
router.get(
  "/broken",
  utilities.handleErrors(invController.throwError)
)

/* ****************************************
 * Build Management View Route
 **************************************** */
router.get(
  "/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagementView)
)

/* ****************************************
 * Build add-classification View Route
 **************************************** */
router.get(
  "/newClassification",
  utilities.checkAccountType,
  utilities.handleErrors(invController.newClassificationView)
)

/* ****************************************
 * Process add-classification Route
 **************************************** */
router.post(
  "/addClassification",
  utilities.checkAccountType,
  invChecks.classificationRule(),
  invChecks.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

/* ****************************************
 * Build add-vehicle View Route
 **************************************** */
router.get(
  "/newVehicle",
  utilities.checkAccountType,
  utilities.handleErrors(invController.newInventoryView)
)

/* ****************************************
 * Process add-vehicle Route
 **************************************** */
router.post(
  "/addInventory",
  utilities.checkAccountType,
  invChecks.newInventoryRules(),
  invChecks.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

/* ****************************************
 * Get vehicles for AJAX 
 **************************************** */
router.get(
  "/getInventory/:classification_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
)

/* ****************************************
 * Deliver the edit inventory view
 **************************************** */
router.get(
  "/edit/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.editInvItemView)
)

/* ****************************************
 * Process the edit inventory request
 **************************************** */
router.post(
  "/update",
  utilities.checkAccountType,
  invChecks.newInventoryRules(),
  invChecks.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

/* ****************************************
 * Deliver the delete confirmation view
 **************************************** */
router.get(
  "/delete/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView)
)

/* ****************************************
 * Process the delete inventory request
 **************************************** */
router.post(
  "/delete",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteItem)
)

module.exports = router
