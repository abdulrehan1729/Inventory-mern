const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/inventory-mern";
const connectOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to MongoDB`);
});

module.exports = mongoose