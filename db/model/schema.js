const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const inventorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    catagory: {
        type: String,
        require: true
    },
    cost_price: {
        type: String,
        require: true
    },
    selling_price: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        enum: ['kg', 'liter', 'pcs']
    }
})

const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory