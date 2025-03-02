const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",  // OpenAPI version
        info: {
            title: "Blog Server", // API title
            version: "1.0.0", // API version
            description: "API documentation for Blog system", // Short description
        },
        servers: [
            {
                url: "http://localhost:8020",
                description: "Development Server"
            }
        ],
    },
    apis: ["./routes/*.js"],
};

// Generate API Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = { swaggerUi, swaggerDocs };
