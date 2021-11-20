import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    email:String,
    firstName:String,
    lastName:String,
    scores:[],
    accuracy:[]

})

module.exports = mongoose.model('Users',UsersSchema)