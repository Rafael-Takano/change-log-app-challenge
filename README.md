# Change Log App Challenge

## Description 

This project is a challenge for a selection process for an internship.

The object of the project is to create a RESTful API for a Change Log App that allows a product manager or an engineer to post projects/products updates for the team to see and keep track of the timelines of each one of them and show the stakeholders the progress made.

## Requirements

- Each project should have updates, and each update should have relevant points. You can add as many entities as you want, as long as it follows a business logic to meet the requirements.
- The API must be able to return data in JSON format.
- The API should provide <ins>filter capabilities</ins> for the projects. Allowing consumers of the API can search projects by date of publication, creator, or name of the project for example.
- The API should be able to support <ins>pagination</ins>.
- The API should have <ins>authentication</ins> methods for users to sign up and sign into the platform. An unauthenticated user shouldn't be able to see the internal projects and their updates.
- Every user in the platform should be able to create, read, update and delete projects.

# Implementation

For the application, I choose to use javascript running on nodejs and mongoDB as my database.

## Setup

To setup this REST API application, is necessary to install nodejs and npm, then run the line below to install the dependencies:

`npm install`

This will install all necessary libraries to the application.

After that, the next step is to create an .env and fill with the necessary enviroment variables: 

- PORT=(A number for the port)
- DB_URI=(A URI for a mongoDB server, local or remote)
- JWT_SECRET=(A string with to use as secret for the cryptography)

At the end of this steps, you can execute `npm run start` to run the application.

## Database Organization 

## Routes

The table below show all the details of the REST API interface, **any request that isn't a user related request needs the bearer token for the authentication of the procedure**

### Users related requests
| HTTP Method | Path | Description | Addicional Parameters|
| ----------- | ----------- | ----------- | ----------- |
|POST|/user/signin|Logs in the user,  return its login and Bearer token|In the body of the request is necessary to send the login and password |
|POST|/user/signup|Register an User, return its login and Bearer token|In the body of the request is necessary to send the login and password|
|PUT|/user/changepassword| Changes the password of an User, return its login and Bearer token|In the body of the request is necessary to send the login, oldPassword and newPassword|
|DELETE|/remove|Deletes an User, return a confirmation of deletion|In the body of the request is necessary to send the login and password|

### Projects related requests
| HTTP Method | Path | Description | Addicional Parameters|
| ----------- | ----------- | ----------- | ----------- |
|GET|/project|Gets the info of the projects without filters|In the URL, the following query params are optional: limit, offset|
|GET|/project/byName/:name|Gets the info of the projects filtering by the name, or a part of the name, of the project|In the URL, the following query params are optional: limit, offset|
|GET|/project/byDate/:date|Gets the info of the projects filtering by the date when the project started|In the URL, the following query params are optional: limit, offset|
|GET|/project/byCreator/:creator|Gets the info of the projects filtering by the creator of the project in the application|In the URL, the following query params are optional: limit, offset|
|POST|/project/:project|Adds a project to the database|In the body of the request is necessary to send the login of the user creating the project|
|PUT|/project/:project|Modifies any or all the info of a project and propagates, if the title is changed, to the updates from the project|Any property to be changed has to be passed on the body with the same keys as defined on the project model|
|DELETE|/project/:project|Deletes a given project||

### Updates related requests
| HTTP Method | Path | Description | Addicional Parameters|
| ----------- | ----------- | ----------- | ----------- |
|GET|/project/:project/update/|Gets the info of the updates in the project without filters|In the URL, the following query params are optional: limit, offset|
|GET|/project/:project/update/byName/:name|Gets the info of the updates in the project filtering by the name of the update|In the URL, the following query params are optional: limit, offset|
|GET|/project/:project/update/byCreator/:creator|Gets the info of the updates in the project filtering by the creator of the update|In the URL, the following query params are optional: limit, offset|
|GET|/project/:project/update/byDate/:date|Gets the info of the updates in the project filtering by the date of the update|In the URL, the following query params are optional: limit, offset|
|POST|/project/:project/update/:update|Adds a update to a project|In the body of the request is necessary to send the login of the user creating the project and an array of strings with the key topics|
|PUT|/project/:project/update/:update|Modifies any or all the info of a update, expect its project|Any property to be changed has to be passed on the body with the same keys as defined on the update model, except the project|
|DELETE|/project/:project/update/:update|Deletes a given update||
