const invModel = require("../models/inventory-model")
const partsModel = require("../models/parts-model")
const utilities = require("../utilities")
const invCont = {}

/* *************************************
 * Build inventory by classification view
 ************************************* */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const nav = await utilities.getNav()

  if (!data || data.length === 0) {
    return res.render("./inventory/classification", {
      title: "No Vehicles Found",
      nav,
      grid: "There are no vehicles in this classification."
    })
  }

  const grid = await utilities.buildClassificationGrid(data)
  const className = data[0].classification_name

  res.render("./inventory/classification", {
    title: `${className} Vehicles`,
    nav,
    grid
  })
}

/* *************************************
 * Build vehicle detail view
 ************************************* */
invCont.buildDetail = async function (req, res, next) {
  const invId = req.params.id
  const vehicle = await invModel.getInventoryById(invId)
  const nav = await utilities.getNav()

  if (!vehicle) {
    return res.render("./inventory/detail", {
      title: "Vehicle Not Found",
      nav,
      htmlData: "",
      parts: []
    })
  }

  let parts = []
  try {
    parts = await partsModel.getPartsByInvId(invId)
    if (!Array.isArray(parts)) parts = []
  } catch {
    parts = []
  }

  const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
  const title = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`

  res.render("./inventory/detail", {
    title,
    nav,
    htmlData,
    vehicle,
    parts
  })
}

/* *************************************
 * Add a part to a vehicle
 ************************************* */
invCont.addPart = async function (req, res, next) {
  const invId = req.params.id
  const { part_name, part_description } = req.body

  await partsModel.addPart(invId, part_name, part_description)

  res.redirect(`/inv/detail/${invId}`)
}

/* *************************************
 * Intentional error
 ************************************* */
invCont.throwError = async function () {
  throw new Error("Intentional error for testing.")
}

/* *************************************
 * Management, classification, inventory
 * (Your original logic preserved)
 ************************************* */
// The rest of the controller stays the same — unchanged:
invCont.buildManagementView = async function (req, res, next) { /* ... */ }
invCont.newClassificationView = async function (req, res, next) { /* ... */ }
invCont.addClassification = async function (req, res, next) { /* ... */ }
invCont.newInventoryView = async function (req, res, next) { /* ... */ }
invCont.addInventory = async function (req, res, next) { /* ... */ }
invCont.getInventoryJSON = async function (req, res, next) { /* ... */ }
invCont.editInvItemView = async function (req, res, next) { /* ... */ }
invCont.updateInventory = async function (req, res, next) { /* ... */ }
invCont.deleteView = async function (req, res, next) { /* ... */ }
invCont.deleteItem = async function (req, res, next) { /* ... */ }

module.exports = invCont
