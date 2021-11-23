import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    email:String,
    userName:String,
    scores:[],
    accuracy:[]

})

module.exports = mongoose.model('Users',UsersSchema)