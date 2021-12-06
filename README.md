# KeKrazy

![kekrazy](https://user-images.githubusercontent.com/71105258/143620299-97543d92-0efc-4676-9524-8e79118c7a1b.gif)

### Live Site: https://kekrazy.jaruliah.me/

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
- Hosted on NGINX VPS

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
- [x] ~Post score after game finish~
- [x] ~Scoreboard page with all scores~
- [x] ~Style UI~
- [x] ~Bug testing~
- [x] ~Deploy :)~

## Future Features

- [x] ~Optimizations~ 
- [ ] Implement web sockets
- [ ] Enable races with users
- [ ] User profiles




