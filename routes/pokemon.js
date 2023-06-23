const express = require("express");
const router = express.Router();
const fs = require("fs");

const Pokemon = require("../models/pokemons"); //importing the model
const pokemondata = fs.readFileSync("./utils/pokemon.json","utf-8");
const pokemonarray = JSON.parse(pokemondata);

// Insert Pokemon data into the MongoDB collection
Pokemon.insertMany(pokemonarray)
  .then(() => {
    console.log("Pokemon data inserted successfully.");
  })
  .catch((err) => {
    console.error("Failed to insert Pokemon data:", err);
  });

// Getting all
router.get("/", async(req, res) => {
  //return res.send("Welcome to Pokemon API");
  try {
    const pokemons = await Pokemon.find();
    return res.json(pokemons);
  }
    catch (err) {
    return res.status(500).json({ message: err.message });
    }
});

// Getting one
// router.get("/:id", (req, res) => {
//   return res.send(req.params.id);
// });
router.get("/:id", async (req, res) => {
    try {
      const pokemonId = req.params.id;
      const pokemon = await Pokemon.findById(pokemonId);
      
      if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
      }
      return res.json(pokemon);
    } catch (err) {
      return res.status(500).json({ error: "Failed to find Pokemon" });
    }
  });

// Creating one
router.post("/", async(req, res) => {
  const newPokemon = new Pokemon({
    name: req.body.name,
    type: req.body.type,
    height: req.body.height,
    weight: req.body.weight,
    abilities: req.body.abilities,
    HP: req.body.HP,
    attack: req.body.attack,
    defense: req.body.defense,
    specialAttack: req.body.specialAttack,
    specialDefense: req.body.specialDefense,
    speed: req.body.speed,
  }); // Create a new Pokemon object from the request body
  try{
    const pokemon = await newPokemon.save();
    return res.status(201).json(pokemon);
  }
  catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
