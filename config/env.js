require("dotenv").config();

const envObj = {
    port: process.env.PORT || 4004,
    mongoUrl: process.env.MONGODB_URL
};

module.exports = envObj; 