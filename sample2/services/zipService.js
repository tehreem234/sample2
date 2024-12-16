const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { getImageNamesForVehicle } = require("./dbService");

// Function to create and stream a ZIP file
const getVehicleImagesZip = async (vehicleId, res) => {
    // Fetch image names for the specified VehicleID
    const imageNames = await getImageNamesForVehicle(vehicleId);

    if (!imageNames || imageNames.length === 0) {
        res.status(404).json({ message: "No images found for the specified vehicle." });
        return;
    }

    // Set headers for ZIP file download
    const zipFileName = `vehicle_${vehicleId}_images.zip`;
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${zipFileName}`
    );

    // Create ZIP archive
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    // Add files to ZIP
    imageNames.forEach(imageName => {
        const imagePath = path.join(__dirname, "../public", imageName);
        if (fs.existsSync(imagePath)) {
            archive.file(imagePath, { name: imageName });
        } else {
            console.warn(`Image not found: ${imagePath}`);
        }
    });

    await archive.finalize();

    archive.on("error", (err) => {
        console.error("Archive error:", err);
        throw new Error("Error creating ZIP file.");
    });
};

module.exports = {
    getVehicleImagesZip,
};

