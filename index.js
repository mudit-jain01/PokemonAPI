require('dotenv').config()

const express = require('express') 
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db=mongoose.connection//connecting to database

db.on('error', (error) => console.error(error))//error handling
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())//middleware
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());//middleware

const pokemonRouter = require('./routes/pokemon')//importing routes
app.use('/pokemons', pokemonRouter)//using routes

// Pokemon.insertMany(pokemonarray, (err) => {
//     if (err) {
//       console.error("Failed to insert Pokemon data:", err);
//     }
//     else{
//         console.log("Pokemon data inserted successfully.");
//     }
// })//inserting data into database

app.listen(port, () => {
    console.log(`Server started on port ${port}`)//listening to port
});