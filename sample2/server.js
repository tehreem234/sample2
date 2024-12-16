const express = require("express");
const path = require("path");
require('dotenv').config();

const imageRoutes = require("./routes/imageRoutes");
const app = express();
const PORT = 3000;

// Static file serving for the public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/images", imageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

