import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School API with JWT Authentication',
            version: '1.0.0',
            description: 'A comprehensive API for managing students, courses, teachers, and users with JWT authentication',
            contact: {
                name: 'API Support',
                email: 'support@schoolapi.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token obtained from /auth/login endpoint'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', format: 'email', example: 'john@example.com' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        token: { type: 'string' },
                        user: { $ref: '#/components/schemas/User' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        error: { type: 'string' }
                    }
                }
            }
        },
        // Global security requirement (can be overridden per route)
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Include controller files and route files for documentation
    apis: [
        '**/controllers/*.js',
        '**/routes/*.js'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'School API Documentation'
});