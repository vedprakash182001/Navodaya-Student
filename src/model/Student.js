const express = require("express");
const  mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required :true,
        minlength :3,
    },
    fatherName : {
        type : String,
        required :true,
        minlength :3,
    },
    motherName :{
        type : String,
        reqiured : true,
        minlength :3
    },
    dateOfBirth :{
        type :Date,
        required :true,
    },
    gender :{
        type : String,
        required :true,
    },
    dateOfJoining:{
        type :Date,
        required :true,
    },
    email :{
        type : String,
        required :true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    mobile :{
        type : Number,
        required :true,
        unique:true,
    },
    address :{
        type : String,
        required :true,
    },
    aboutNavodaya :{
        type : String,
        default : " "
    },
    goalAndAchivement :{
        type : String,
        default : " ",
    },
    password :{
        type : String,
        required :true,
    },
})

const  student = new mongoose.model("studentData",studentSchema);
module.exports = student;
