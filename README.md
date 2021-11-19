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
npm install
```

* To create production ready build:

```
npm run build
```

## Things to do

- [x] ~Initialize project, setup database~
- [x] ~Build GET API route~
- [x] ~Build POST API route~
- [x] ~Install/setup React~
- [x] ~Setup Auth0 on~
- [x] ~Login/Logout buttons~
- [x] ~Get words display on screen~
- [x] ~Game loop~
- [x] ~Error checking words and characters~
- [x] ~Going backwards with backspace~
- [x] ~Visual display, character cursor~
- [x] Post score after game finish
- [ ] Scoreboard page with all scores
- [ ] Style UI
- [ ] Bug testing
- [ ] Deploy :)



