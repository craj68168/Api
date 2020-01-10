const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
        },
    password: {
        type: String,
        required:true
        },
    date:{
        type:String
    },
    gender:{
        type:String
    },

    profileimage:{
        type:String
    },
   
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
    });

// userSchema.statics.checkCrediantialsDb = async (email, pass) =>{

//     const user1 = await User.findOne({email : email, password : pass})
//         return user1;
//     }



// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
   
//    console.log(token);
//     user.tokens = user.tokens.concat({ token :token })
// await user.save()
// return token
// }


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User',userSchema);
module.exports = User;

