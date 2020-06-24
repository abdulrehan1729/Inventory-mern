require("dotenv").config();
const router = require("express").Router();
const itemsController = require("../controller/items.controller");

router.post("/items/add", itemsController.createItem);

router.get("/items/get-all", itemsController.getItems);

router.get("/items/get-available-items", itemsController.getAvailableItems);

router.post("/items/quantity-update/", itemsController.updateItemQuantity);

router.post("/items/update/:id", itemsController.updateItem);

router.delete("/items/remove", itemsController.removeItem);

module.exports = router;
