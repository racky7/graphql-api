import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    temp:{
        type:Number,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    }
})

const accountSchema = new mongoose.Schema({
    bank:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    bank_code:{
        type:String,
        required:true
    },
    weather:weatherSchema

})

const customerSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    accounts:{
        type:[accountSchema],
    }
    
})

mongoose.model("Customer", customerSchema)