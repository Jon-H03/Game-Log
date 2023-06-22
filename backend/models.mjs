// Import Dependencies
import mongoose from "mongoose";
import 'dotenv/config';

// Connect based on the parameters provided in the .env file.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
)
const db = mongoose.connection;

// Make sure the database has connected and print a success message to console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: "500: Connection to the server failed."})
    } else {
        console.log("Successfully connected to MongoDB.")
    }
});

// Create the schema, in my case, will be about Video Games
const gameSchema = mongoose.Schema({
    name:   { type: String, required: true},
    genre:  { type: String, required: true},
    rating: { type: Number, 
              required: true,
              default: 0,
              min: [0, "You must fill in this field."]},
    date:   { type: Date, required: true, min: '2023-05-28', default: Date.now}

});

// Compile the model from defined schema.
const Game = mongoose.model("Game", gameSchema);

// Create a Video Game document in the collecction
const createGame = async (name, genre, rating, date) => {
    // Call the ocnstructor to create an instance of the model class VGame.
    const game = new Game({
        name: name,
        genre: genre,
        rating: rating,
        date: date,
    })
    // Use save to persist this object as a document in MongoDB.
    return game.save();
}

// FIND & RETRIEVE
// Retrieve video games based on the filter, projection, and limt params.
const findGame = async () => {
    const query = Game.find();
    return query.exec();
}

// Find by ID
const findGameById = async (id) => {
    const query = Game.findById(id);
    return query.exec();
}

// Replace the properties of an exercised based on id provided.
const updateGame = async (id, name, genre, rating, date) => {
    const result = await Game.replaceOne({ _id: id}, {
        name: name,
        genre: genre,
        rating: rating,
        date: date,
    });
    return {
        id: id,
        name: name,
        genre: genre,
        rating: rating,
        date: date }
}

// Delete video game with provided id value.
const deleteGame = async (id) => {
    const result = await Game.deleteOne({ _id: id});
    //Return the count of the deleted document (will be 0 or 1).
    return result.deletedCount;
}
export {createGame, findGame, findGameById, updateGame, deleteGame}; 