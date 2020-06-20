const router = require("express").Router();
require("dotenv").config();

router.get("/", (req, res) => {
    res.json({
        ok: 200
    })
});

module.exports = router;