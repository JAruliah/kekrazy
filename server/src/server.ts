const express = require('express')
const PORT = 6001
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const { json } = require('body-parser')
const cors = require("cors")
app.use(cors())
const User = require('./model/User')

app.use(express.json())

//ROUTES

// get the scores for the user, if user does not exist add to database
app.post('/', async(req:any, res:any) => {
    try{
        // Look for user in the database
        const sentUser:{}[] = await User.find({email:req.body.email})
        // if the user doesnt not exist save the user to the database
        if (sentUser[0] === undefined){
            const user = new User({
                email:req.body.email,
                userName:req.body.userName,
                scores:[]
            })
            // save user to database and send the user to client
            user.save()
            res.send(user)
    }
    // if user already exists send the user to the client
    else{
        res.send(sentUser)
    }
    // sent 500 status if error
    }catch(err){res.sendStatus(500)}
})

// Posting scores to the db
app.post('/scores', async(req:any,res:any)=>{
    try{
        // update the scores array of the user given the email
        const updateScore:{}[] = await User.updateOne({email:req.body.email},{$push:{scores:req.body.score}})
        const updateAccuracy:{}[] = await User.updateOne({email:req.body.email},{$push:{accuracy:req.body.accuracy}})
        const sentUser:{}[] = await User.find({email:req.body.email})
        // send the user object to the client
        res.json(sentUser).send

        // send 500 status if error
    }catch(err){res.sendStatus(500)}

})

// Get the users, send the client down all users
app.get('/scores', async(req:any,res:any) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err){console.log(err)}
})


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>{
    console.log('Connected to DB!')
})

//Server listening
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})