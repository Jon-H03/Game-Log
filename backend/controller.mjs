// This controller uses REST.
import 'dotenv/config';
import express from 'express';
import * as GameLog from './models.mjs';

const PORT = process.env.PORT;
const app = express();

// REST needs JSON MIME type
app.use(express.json());

// Create a new video game entry using REST and POST with status errors. 
app.post('/', (req, res) => {
    GameLog.createGame(
        req.body.name,
        req.body.genre,
        req.body.rating,
        req.body.date
    )
    .then(game => {
        return res.status(201).json(game);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: "The creation of this entry has failed, please wait a bit or try again."})
    });
});

// RETRIEVE or READ REST's GET
app.get('/', (req, res) => {
    GameLog.findGame()
    .then(game => {
        if (game !== null) {
            res.json(game);
        } else {
            res.status(404).json({ Error: 'Video Game document not found.'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Requests to retrieve video game entry failed, please ensure the details are correct and that the title has been enetered correctly."})
    });
});

// UPDATE using REST and PUT works
// Put is based on ID, so include it in params.
app.put('/:_id', (req, res) => {
    // Notive use of params.id
    GameLog.updateGame(
        req.params.id,
        req.body.name,
        req.body.genre,
        req.body.rating,
        req.body.date
    )
    .then(game => {
        // If found, update the video game.
        res.json(game);
    })
    .catch(error => {
        console.log(game);
        console.log(error);
        res.status(400).json({ error: "Request to edit has failed, please try again and ensure all the details are correct."})
    });
});

// Delete by ID using REST and DELETE
// Delete is based on ID
app.delete('/:id', (req, res) => {
    GameLog.deleteGame(req.params.id)
        .then(deletedCount => {
            // Delete >= 1
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Document not found or does not exist.'});
            }
        })
        .catch(error => {
            console.log(error);
            res.send({ error: 'Request to delete by ID failed, please wait a bit or try again.'})
        });
});

// REST and Express listen to the port noted above
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
}); 