const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ragistration", {
    // useNewUrlParser:true,
    // useUnifideTopology:true,
    // useCreateIndex:true
}).then(() => {
    console.log(`connection successful`);  
}).catch((e) => {
    console.log(`no connection`);    
})