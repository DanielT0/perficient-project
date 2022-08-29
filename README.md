##Proyecto de entrenamiento Perficient

The endpoints for the API have been developed taking into account the instructions given in the file Considerations (1), which covers some technologies or tools that are below

###GitHub
You can access to the repository where the project is contained by clicking the following link: https://github.com/DanielT0/perficient-project/branches

You'll find 4 important branches inside it:

- development

Here is where the code was developed and uploaded to fulfill all the purpoused functions

- testing

Here lives the user.test.js file, where the unit testing is done for each one of the endpoints, all of that using jest

- production

It's an 'non-complete' branch, created to upload the project to digitalOcean using docker. However, the developer is still learning about that so he uploaded the API to heroku so you can access the endpoints

- main

It's the main and most important branch, all the final changes are shown here, and also, the code that you'll see there is the one that was uploaded to heroku

###Pagination

In the considerations document is a function that covers pagination with mongoose, however, this is not covered here as it's optional

###Good practices

The project was made with Typescript (except for the tests), express, mongodb, mongoose, dotenv and other modules. Some good practices and handling of errors were applied, as the use of mongoose middlewares and express middlewares for the fields validation

###Access

If you run the code in your local device, it will run in PORT:3000 (which is configured in the config.env file), so the route will be localhost:3000/

Initially the DB is empty

The endpoints are made with the same structure that is established in the considerations file.

However, if you want to access to the heroku app, you cand do it through this url: https://perficient-learning-project.herokuapp.com/

The endpoints attached to it are the same as they are in local

###Config.env

You must have env variables to run the app in local, this document will be provided personally as it has important data
