const mongoose = require("mongoose");

const enployeeSchema = new mongoose.Schema({
  firstname : {
    type:String,
    required:true
  },
  lastname : {
    type:String,
    required:true
  },
  email : {
    type:String,
    required:true,
    unique:true
  },
  gender : {
    type:String,
    required:true
  },
  phone : {
    type:String,
    required:true,
    unique:true
  },
  age : {
    type:String,
    required:true
  },
  password : {
    type:String,
    required:true
  },
  confirmpassword : {
    type:String,
    required:true
  }
  
})

const Register = new mongoose.model("Register",enployeeSchema);
module.exports = Register

