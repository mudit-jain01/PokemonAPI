const mongoose = require('mongoose');

const pokemonSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    type:{
        type:String,
    },
    height:{
        type:String,
    },
    weight:{
        type:String,
    },
    abilities:{
        type:String,
    },
    HP:{
        type:Number,
    },
    attack:{
        type:Number,
    },
    defense:{
        type:Number,
    },
    specialAttack:{
        type:Number,
    },
    specialDefense:{
        type:Number,
    },
    speed:{
        type:Number,
    }
})

module.exports=mongoose.model('Pokemon',pokemonSchema)  //exporting the model   