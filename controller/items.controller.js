const Items = require("../db/model/schema");

module.exports = {
  createItem(req, res) {
    const {
      name,
      catagory,
      cost_price,
      selling_price,
      quantity,
      unit,
    } = req.body;
    const item = {
      name: name,
      catagory: catagory,
      cost_price: cost_price,
      selling_price: selling_price,
      quantity: quantity,
      unit: unit,
    };
    Items.create(item, (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Internal server error",
        });
      }
      return res.json(docs);
    });
  },
  getItems(req, res) {
    let query = Items.find({});
    query.exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Internal server error",
        });
      }
      return res.json(docs);
    });
  },
  updateItem(req, res) {
    console.log(req.params);
    Items.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: "Inetrnal server error",
          });
        }
        return res.json(docs);
      }
    );
  },

  updateItemQuantity(req, res) {
    let changeInQuantity = req.body.quantity_sold;
    Items.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { quantity: -changeInQuantity },
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
      }
    );
  },
};
