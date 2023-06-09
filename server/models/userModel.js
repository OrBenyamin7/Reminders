const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const Schema = mongoose.Schema

const userShcema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    }
})


//static signup method
userShcema.statics.signup = async function(email,password,name) {
   
//validation 
if(!email || !password || !name){
    throw Error('All fields must be filled')
}
if(!validator.isEmail(email)){
    throw Error('Email is NOT valid')
}
if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
}


const exists = await this.findOne({email})
    
    if(exists){
        throw Error('Sorry, this Email already in use ')
    }

    const salt = await bcryptjs.genSalt(10)
    //bycrpt hash our password
    const hash = await bcryptjs.hash(password,salt)
    //create the doc forus
    const user = await this.create({email,name,password: hash})
    return user

}

//static login method 
userShcema.statics.login = async function(email,password){
   //validation 
if(!email || !password){
    throw Error('All fields must be filled')
}

const user = await this.findOne({email})
    
    if(!user){
        throw Error('Incorrect Email!')
    }

    const match = await bcryptjs.compare(password,user.password) //hash password =user.password
    
    if(!match){
        throw Error('Incorrect password')
    }
    return user

}



module.exports = mongoose.model('User', userShcema)