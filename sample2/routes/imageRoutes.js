const express = require("express");
const { getVehicleImagesZip } = require("../services/zipService");

const router = express.Router();

// Route to download vehicle images as a ZIP file
router.get("/:vehicleId", async (req, res) => {
    try {
        const { vehicleId } = req.params;
        await getVehicleImagesZip(vehicleId, res);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});


// get api
// - URL: `http://localhost:3000/images/1001`

module.exports = router;

