const mongoose = require("mongoose");
const db = "mongodb+srv://vedprakash:Ved12345@cluster0.omanl.mongodb.net/NAVODAYADATA?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser :true,
}).then(()=>{
    console.log("Connection Successfull");
}).catch(()=>{
    console.log("no connection");
})