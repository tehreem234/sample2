const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Function to get image filenames for a specific VehicleID
const getImageNamesForVehicle = async (vehicleId) => {
    const pool = await sql.connect(dbConfig);
    const query = `
        SELECT ImageName 
        FROM VehicleImage
        WHERE VehicleID = @VehicleID
        ORDER BY ImageNumber ASC
    `;
    const result = await pool
        .request()
        .input("VehicleID", sql.Int, vehicleId)
        .query(query);
    return result.recordset.map(row => row.ImageName);
};

module.exports = {
    getImageNamesForVehicle,
};

