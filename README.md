# Typing Test

## Description

This project is a typing speed test. Outputs phrases onto the screen with a timer, the user must time out all the words as fast as possible. When complete a words per minute score will be displayed. Users have the option to create an account, if logged in the scores will be saved and an average words per minute score will be displayed on the home screen.

## Built With
- Typescript
- React
- Auth0
- Nodejs
- Express
- MongoDB
- Bootstrap
- SCSS

## Getting Started

### Installing/Setup
#### Server 
* Inside of server folder .env file must be created with contents as follows: 

    DB_CONNECTION="your database connection"

* to install all server dependencies run:

```
cd server
npm install
```
* after install all dependancies, typescript files must be compiled: 
```
npm run build
```
#### Client
* Inside of client folder .env file must be created with content as follows: 

    REACT_APP_BASE_URL= "your base api url" 
    REACT_APP_AUTH0_DOMAIN =  "your auth0 domain here"
    REACT_APP_AUTH0_CLIENT_ID = "your auth0 client id here"

* SCSS files need to be compiled, you can run:

```
cd /client
npm run scss
```

* To install all dependencies run:

```
cd client
npm install
```