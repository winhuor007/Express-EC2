## Install

    - yarn install or npm i

## To Run project

    - yarn dev
    -> http://localhost:3000/v1/products

## How to config it

     - Create :  .env.local
        * build/configs/.env.local

    - Create :  .env.development
        * src/configs/.env.development

## in side the file, you can put both with :

    - PORT=your_port
    - NODE_ENV=development
    - MONGODB_URL=mongodb+srv://<user_name>:<password>@bookscluster.xfo1s.mongodb.net/...

![2024-09-09 15 36 32](https://github.com/user-attachments/assets/f7a84964-5c5b-4f88-b5ea-8e6ed7a908e1)

## Project Structure

    Project Folder Structure
    ├── build/              # Compiled files
    ├── node_modules/       # Project dependencies
    ├── src/                # Source files
    │   ├── configs/        # Configuration files for the application
    │   ├── controllers/    # Handles incoming requests and send responses
    │   ├── database/       # Database connection logic, models # and repositories
    │   ├── docs/           # Swagger/OpenAPI documentation files
    │   ├── middlewares/    # Express middleware for request processing
    │   ├── routes/         # Route definitions linking requests to controllers
    │   ├── schema/         # Scheme to validate product creation input
    │   ├── services/       # Business logic and data access code
    │   ├── utils/          # Utility functions and helpers
    │   ├── app.ts          # Initializes and configures the application
    │   ├── config.ts       # configures file .env
    │   └── server.ts       # Entry point for the application, starts the server
    ├── build-script.js     # Script for compiling TypeScript using esbuild
    ├── nodemon.json        # Nodemon configuration for development
    ├── package.json        # Manages dependencies and project metadata
    ├── tsconfig.json       # TypeScript compiler configuration
    └── tsoa.json           # tsoa configuration for routes and documentation

--->

## In Folder src Detail :

    src
    ├── configs/
    │   └── .env.development
    ├── controllers
    │   ├── product.controller.ts
    │   └── types
    │       ├── product-request.type.ts
    │       ├── product-response.types.ts
    │       └── user-response.type.ts
    ├── database
    │   ├── connection.ts
    │   ├── models
    │   │   └── product.model.ts
    │   └── repositories
    │       ├── product.repository.ts
    │       └── types
    │            └── product-repository.type.ts
    ├── docs
    │   └── swagger.json
    ├── middlewares
    │   ├── global-error.ts
    │   └── validate-input.ts
    ├── routes
    │   └── v1
    │       └── routes.ts
    ├── schema
    │   └── product.schema.ts
    ├── services
    │   └── product.service.ts
    ├── utils
    │   ├── constants
    │   │   ├── app-error-message.ts
    │   │   └── status-code.ts
    │   └── errors.ts
    ├── app.ts
    ├── config.ts
    └── server.ts

## Update

    - Run : yarn global add pm2
    - Add this script to package.json

        "start:local": "pm2 start ecosystem.config.local.js",
        "start": "pm2 start ecosystem.config.js",
        "restart": "pm2 reload ecosystem.config.js",
        "db:insert": "ts-node src/database/scripts/insert-data.ts"
