import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    email:String,
    scores:[]

})

module.exports = mongoose.model('Users',UsersSchema)