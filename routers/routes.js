require("dotenv").config();
const router = require("express").Router();
const itemsController = require("../controller/items.controller");
router.get("/", (req, res) => {
  res.json({
    ok: 200,
  });
});
router.post("/items/add", itemsController.createItem);

router.get("/items/get-all", itemsController.getItems);

router.patch("/items/quantity-update/:id", itemsController.updateItemQuantity);

router.post("/items/update/:id", itemsController.updateItem);

module.exports = router;
