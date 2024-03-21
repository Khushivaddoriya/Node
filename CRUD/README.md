# Boilerplate Backend

This repository contains the code for the Boilerplate Backend project, a Node.js application that provides a foundation for building web applications. It includes essential features, code structure, and error handling mechanisms to help you kickstart your backend development.

## How to Run the Project

To run the project, follow the steps below:

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Start the project in the development environment:

   ```bash
   npm run start:dev
   ```

## Features

The Boilerplate Backend project includes the following features:

1. Signup user
2. Login user
3. Forgot password
4. Login with Google
5. Login with Facebook

## Code Structure

The codebase follows a modular structure to ensure separation of concerns and maintainability. Here's an overview of the main directories and their purposes:

- `config`: Contains the database configuration file (`db_config.js`).
- `common/constant`: Manages environment variables (`config.constant.js`), HTTP status codes and response payload codes (`global.constant.js`), database table names (`schema.constant.js`), and view templates (`view.constant.js`).
- `common/exceptions`: Contains exception classes for error handling.
- `middleware/error.js`: The exception manager middleware, registered globally in `app.js`, handles exceptions and constructs proper responses to send to the client.
- `middleware/response/responseHandler.js`: Defines predefined response methods to simplify sending responses to clients.

## Database Connection

To configure the database connection, modify the `config/db_config.js` file.

## Environment Variables

Manage environment variables in the `common/constant/config.constant.js` file.

## Error/Exception Handling

The Boilerplate Backend project provides a robust error handling mechanism using exception classes located in the `common/exceptions/*.js` files. Instead of manually returning status codes and handling responses in controllers, you can throw relevant exceptions in the service and controller layers. The exception manager middleware, located in `middleware/error.js` and registered globally in `app.js`, handles these exceptions and constructs proper responses to send to the client.

## Client Responses

To simplify sending responses to clients, developers can use the predefined response methods available globally. Instead of manually constructing the response payload using `res.status().json({})`, developers can use the response handler function defined in `middleware/response/responseHandler.js`. For example, to send a success response to the client, developers can use `res.ok({ message: "Success", data: anyData })`.

Please note that these response methods are available globally throughout the project as they are bound to the response object of Express in the `app.js` file.

---

Feel free to customize this README.md file based on your project's specific needs and add any additional sections or details. Good luck with your Boilerplate Backend project!
