const express = require("express");
const path = require("path");
const port = process.env.PORT ||8000;
const app  = express();
require("./Database/db");
const student = require("./model/Student");
const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"./templete/views");
const partialsPath = path.join(__dirname,"./templete/partials");
const bcrypt = require("bcryptjs");
const hbs = require("hbs");

hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(express.static(publicPath)); 

app.get("/",(req,res)=>{
    res.render("index");
})


app.get("/registration",(req,res)=>{
    res.render("registration");
})

app.get("/about", async(req,res)=>{
    try{
        res.render("about");
    }catch(err){
        res.send(err);
    }
})
app.get("/studyMaterial", async(req,res)=>{
    try{
        res.render("studyMaterial");
    }catch(err){
        res.send(err);
    }
})
app.get("/alum", async(req,res)=>{
    try{
        res.render("alum");
    }catch(err){
        res.send(err);
    }
})
app.get("/scholar", async(req,res)=>{
    try{
        res.render("scholar");
    }catch(err){
        res.send(err);
    }
})


app.get("/login", async(req,res)=>{
    try{
        res.render("login")
    }catch(err){
        console.log(err);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const loginEmail = req.body.loginEmail;
        const loginPassword = req.body.loginPassword;
        const data = await student.findOne({email : loginEmail});
        const currentPassword = data.password;
        const status = await bcrypt.compare(loginPassword,currentPassword);
        if(status){
            res.render("index");
        }
        else{
            res.send("Invalid login details")
        }
    }catch(err){
        res.send("Invalid login Detail");
    }
})

app.get("/forgotPassword", async(req,res)=>{
    try{
        res.render("forgotPassword");
    }catch(err){
        res.send(err);
    }
})

app.post("/registration", async(req,res)=>{
    try{
        const pass = req.body.password;
        const passAgain = req.body.passwordAgain;
        if(pass===passAgain){
            const hashpass = await bcrypt.hash(pass,10);
            const studentData = new student({
                studentName : req.body.studentName,
                fatherName :  req.body.fatherName,
                motherName :  req.body.motherName,
                dateOfBirth : req.body.dateOfBirth,
                gender : req.body.gender1,
                dateOfJoining : req.body.dateOfJoining,
                email : req.body.email,
                mobile : req.body.mobile,
                address : req.body.address,
                aboutNavodaya : req.body.aboutNavodaya,
                goalAndAchivement : req.body.goalAndAchivement,
                password : hashpass,

            })
            const result = await studentData.save();
            res.render("login");
        }
        else{
            res.send("password are not matching");
        }
    }catch(err){
        console.log(err);
    }
})






app.listen(port,()=>{
    console.log(`i am starting port no. ${port}`);
})